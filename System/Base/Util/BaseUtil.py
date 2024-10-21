import threading
import traceback
import time

class BaseUtil:

    system = None
    name = None
    gpio = None

    def __init__(self, system):
        self.system = system
        self.gpio = system.gpio
        self.postInit()
        self.system.log('Initializing ' + self.name)
        
    def postInit(self):
        time.sleep(0)

    def execute(self):
        self.system.log("OVERRIDE THIS")
