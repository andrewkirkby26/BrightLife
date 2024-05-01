import os
from signal import signal, SIGINT
from sys import *
import time
from Feeder.FeederSystem import FeederSystem
from LaserTainer.LaserTainerSystem import LaserTainerSystem

class Launcher:
    system = None

    def run(self):
        #Used to detect ctrl+c for a safe shutdown
        signal(SIGINT, self.shutdown)

        SERIAL_NO = os.getenv('SERIAL_NO')

        if SERIAL_NO is None:
            SERIAL_NO = "LT-1"
            
        print('SERIAL_NO: ' + SERIAL_NO)
        
        if SERIAL_NO.startswith('LT'):
            
            self.system = LaserTainerSystem()
            self.system.init()
        elif SERIAL_NO.startswith('FE'):
            self.system = FeederSystem()
            self.system.init()

        # Just so this thread continues
        while True:
            time.sleep(10)

    def shutdown(self, signal_received, frame):
        self.system.shutdown()
        exit(0)

if __name__ == "__main__":
    launcher = Launcher()
    launcher.run()