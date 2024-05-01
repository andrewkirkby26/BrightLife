from sys import maxunicode
from threading import current_thread
from os import read
import traceback
import datetime as dt
from Base.BaseSystem import BaseSystem
from Feeder.Subsystems.FeederSubsystem import FeederSubsystem
from Feeder.Monitors.FeederTaskExecutor import FeederTaskExecutor

class FeederSystem(BaseSystem):
    LOG = []
    kind = "Feeder"

    feederSubsystem:  FeederSubsystem = None

    def init(self):
        try:
            super().init()
            
            self.feederSubsystem = FeederSubsystem(self)
            self.feederSubsystem.init()

            self.initialized = True
                    
        except Exception as e:
            self.log('Error During Init: ' + str(e) + str(traceback.format_exc()))

    def executeRequest(self, req):
        try:
            handled = super().executeRequest(req)
            if not handled:
                command = req['command']
                    
        except Exception as e:
            self.system.log('Error in execute request', e)

    def runTask(self, task):
        self.taskExecutor = FeederTaskExecutor(self, task)