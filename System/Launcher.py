import os
from signal import signal, SIGINT
from sys import *
from Base import BaseConstants
import threading
import traceback
import time
import time
from LaserTainer.LaserTainerSystem import LaserTainerSystem
from Base.BaseSystem import BaseSystem

class Launcher:
    system: BaseSystem = None
        
    def prep(self):
        #Used to detect ctrl+c for a safe shutdown
        signal(SIGINT, self.shutdown)

        SERIAL_NO = os.getenv('SERIAL_NO')

        if SERIAL_NO is None:
            SERIAL_NO = BaseConstants.SERIAL_PREFIX_LASER_TAINER + "-1"
            
        print('SERIAL_NO: ' + SERIAL_NO)
        
        if SERIAL_NO.startswith(BaseConstants.SERIAL_PREFIX_LASER_TAINER):
            self.system = LaserTainerSystem(SERIAL_NO)
            self.system.init()

    def shutdown(self, signal_received, frame):
        self.system.shutdown()
        exit(0)

if __name__ == "__main__":
    launcher = Launcher()
    launcher.prep()