import threading
import traceback
import time

class BaseMonitor(threading.Thread):

    loopCount = 0
    system = None
    timeout = 2
    name = None
    gpio = None

    def __init__(self, timeout: int, system):
        self.timeout = timeout
        threading.Thread.__init__(self)
        self.system = system
        self.gpio = system.getGPIO()
        self.daemon = True

    def init(self):
        self.postInit()
        self.start()

    def postInit(self):
        time.sleep(0)

    def run(self):
        self.system.log(self.name + ' Thread Started')
        while (True):
            try:
                self.loopCount = self.loopCount + 1
                if (not self.system.shouldShutdown()):
                    self.cycleOnce()
            except Exception as e:
                self.system.log(traceback.format_exc())
            time.sleep(self.timeout)

    def cycleOnce(self):
        self.system.log("Override this function")