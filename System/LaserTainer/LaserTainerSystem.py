from sys import maxunicode
from threading import current_thread
from os import read
import traceback
import time
import datetime as dt
from Base import BaseConstants as BaseConstants
from Base.BaseSystem import BaseSystem
from LaserTainer import LasterTainerConstants
from Base.Components.Servo import Servo
from Base.Firebase.PubSubPublisher import PubSubPublisher
from LaserTainer.Subsystems.LaserSubsystem import LaserSubsystem
from LaserTainer.Subsystems.ArmSubsystem import ArmSubsystem
from LaserTainer.Monitors.LaserTainerTaskExecutor import LaserTainerTaskExecutor

class LaserTainerSystem(BaseSystem):
    LOG = []
    kind = "LaserTainer"

    laserSubsystem: LaserSubsystem = None
    armSubsystem:  ArmSubsystem = None

    def init(self):
        try:
            super().init()
            
            self.laserSubsystem = LaserSubsystem(self)
            self.laserSubsystem.init()
            self.armSubsystem = ArmSubsystem(1, self)
            self.armSubsystem.init()

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
        self.setTaskExecutor(LaserTainerTaskExecutor(self, task))