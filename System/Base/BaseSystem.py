import json
import os
import string
from sys import maxunicode
from threading import current_thread
from os import read
import traceback
from Base import BaseConstants as Constants
import datetime

if Constants.IS_DEV:
    ports = {}
else:
    import RPi.GPIO as ports
    
import time
from Base.Entities.BaseStatus import BaseStatus
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.StatePublisher import StatePublisher
from Base.Monitors.MessageRequest import MessageRequest
from Base.Util.DeviceDataFetcher import DeviceDataFetcher
from Base.Util.AccessPointUtil import AccessPointUtil
from Base.Entities.DeviceData import DeviceData
from Base.Monitors.ScheduleMonitor import ScheduleMonitor
from Base.Monitors.TaskExecutor import TaskExecutor
from Base.Util.MessagePoster import MessagePoster
from Base.REST.Wifi.WifiREST import WifiREST
from Base.Util.WifiUtil import WifiUtil
from Base.Monitors.ResetHardwareMonitor import ResetHardwareMonitor
from Base.Util.EventPoster import EventPoster

class BaseSystem:

    if not Constants.IS_DEV:
        ports.setmode(ports.BCM)
        ports.setwarnings(False)

    gpio = ports

    LOG = []
    SHUTDOWN = False
    
    deviceData: DeviceData = {}
    serialNo = ""

    kind = "BaseSystem"

    lastExecuteTime = None
    initialized = False
    status = BaseStatus(time.time() * 1000, Constants.STATE_INITIALIZING, '', {}, serialNo)
    firestoreUtil: FireStoreUtil
    statePublisher: StatePublisher
    messageRequest: MessageRequest
    deviceDataFetcher: DeviceDataFetcher
    eventPoster: EventPoster
    scheduleMonitor: ScheduleMonitor
    resetHardwareMonitor: ResetHardwareMonitor
    taskExecutor: TaskExecutor
    accessPoint: AccessPointUtil
    messagePoster: MessagePoster
    wifiREST: WifiREST
    wifiUtil: WifiUtil

    def __init__(self, serialNo: str):
        self.serialNo = serialNo
        # Firestore
        self.firestoreUtil = FireStoreUtil(self)
        
        # State Publisher
        self.statePublisher = StatePublisher(60, self)
        self.statePublisher.init()
        
        self.deviceDataFetcher = DeviceDataFetcher(self)

        self.scheduleMonitor = ScheduleMonitor(5, self)
        self.scheduleMonitor.init()

        self.messagePoster = MessagePoster(self)
        
        self.accessPoint = AccessPointUtil(self)

        self.eventPoster = EventPoster(self)

        self.messageRequest = MessageRequest(1, self)
        self.messageRequest.init()
        
        self.wifiUtil = WifiUtil(self)
        
        self.resetHardwareMonitor = ResetHardwareMonitor(5, self)
        self.resetHardwareMonitor.init()
        
        self.log(self.kind + " Instantiated")
        
        # This keeps this thread alive
        self.wifiREST = WifiREST()
        self.wifiREST.init(self)

    def init(self):
        try:
            self.log(self.kind + " Initializing")
            
        except Exception as e:
            self.log('Error During Init: ' + str(e) + str(traceback.format_exc()))
        
        self.setStatus(self.status.setState(Constants.STATE_IDLE))

    def getGPIO(self): 
        return self.gpio

    def log(self, object):
        print('LOG: ' + str(object))
        self.LOG.append(str(datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S")) + ' - ' + str(object))

    def getLog(self):
        return self.LOG
    
    def getStatus(self) -> BaseStatus:
        return self.status

    def setStatus(self, status: BaseStatus):
        self.status = status
        self.statePublisher.postState()

    def setState(self, state: str):
        self.statue = self.getStatus().setState(state)
        self.statePublisher.postState()
    
    def getFirestoreUtil(self) -> FireStoreUtil:
        return self.firestoreUtil
    
    def getWifiUtil(self) -> WifiUtil:
        return self.wifiUtil
    
    def getSerialNo(self) -> string:
        return self.serialNo
    
    def getAccessPoint(self) -> AccessPointUtil:
        return self.accessPoint

    def getDeviceData(self) -> DeviceData:
        return self.deviceData
    
    def updateLastExecuteTime(self):
        self.lastExecuteTime = self.system.getNowTime()

    def setDeviceData(self, deviceData: DeviceData):
        self.deviceData = deviceData
        self.log("Updated Device Data")
        self.log("Device:")
        self.log(deviceData.device)
        self.log("Schedule:")
        self.log(deviceData.schedules)
        self.log("Pets:")
        self.log(deviceData.pets)

    def executeRequest(self, req):
        handled = False
        try:
            command = req['command']
            self.log('Message = ' + str(req))
            if command == 'updateConfig':
                self.deviceDataFetcher.execute()
                handled = True
            elif command == 'execute':
                self.runTask(req)
                handled = True
            elif command == 'stop':
                if self.getTaskExecutor() is not None:
                    self.taskExecutor.stop()
                handled = True
        except Exception as e:
            self.log('Error handling execute req', e)

        return handled

    def getTaskExecutor(self): 
        return self.taskExecutor
    
    def setTaskExecutor(self, taskExecutor):
        self.taskExecutor = taskExecutor

    def runTask(self, task):
        self.log('OVERRIDE THIS RUN TASK SYSTEM')

    def getNowTime(self):
        hour = str(datetime.datetime.now().hour).zfill(2)
        min = str(datetime.datetime.now().minute).zfill(2)
        return hour + ':' + min
    
    def shouldShutdown(self): 
        return self.SHUTDOWN

    #Anything that needs to shutdown nicely
    def shutdown(self):
        try:
            self.SHUTDOWN = True
            if not Constants.IS_DEV:
                self.gpio.cleanup()
        except:
            self.log('Shutdown Failed')
        else:
            self.log('Shutdown Successful')