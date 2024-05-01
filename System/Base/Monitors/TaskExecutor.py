from Base import BaseConstants 
import time
import threading
import traceback
import calendar
from datetime import date

class TaskExecutor(threading.Thread):

    name = "Task Executor"
    system: None
    task: None
    gpio: None
    killed = False

    def __init__(self, system, task):
        threading.Thread.__init__(self)
        self.daemon = True
        self.gpio = system.gpio
        self.system = system
        self.task = task
        self.start()

    def run(self):
        self.system.log(self.name + '  Executing Task')
        try:
            self.system.setStatus(self.system.status.setState(BaseConstants.STATE_EXECUTING))
            self.system.lastExecuteTime = self.system.getNowTime()
            self.executeTask()
        except Exception as e:
            self.system.log(traceback.format_exc())
            
        
        self.cleanUp()
        self.system.log('Completed Task')
        self.system.setStatus(self.system.status.setState(BaseConstants.STATE_IDLE))
        self.system.taskExecutor = None

    def executeTask(self):
        self.system.log('OVERRIDE THIS')

    def cleanUp(self):
        self.system.log('Cleaning Up')

    def stop(self):
        self.killed = True
        self.system.log('Requested to stop task')

    def postMessage(self, message):
        self.system.messagePoster.postMessage(message)

    def postEvent(self, event):
        self.system.eventPoster.postEvent(event)