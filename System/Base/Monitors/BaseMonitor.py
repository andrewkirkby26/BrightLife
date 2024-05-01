import threading
import traceback
import time

class BaseMonitor(threading.Thread):

    loopCount = 0
    system = None
    timeout = None
    name = None
    gpio = None

    def __init__(self, timeout, system):
        self.timeout = timeout
        threading.Thread.__init__(self)
        self.system = system
        self.gpio = system.gpio

    def init(self):
        self.daemon = True
        self.start()

    def run(self):
        self.system.log(self.name + ' Thread Started')
        while (True):
            try:
                self.loopCount = self.loopCount + 1
                if (not self.system.SHUTDOWN):
                    self.cycleOnce()
            except Exception as e:
                self.system.log(traceback.format_exc())
            time.sleep(self.timeout)

    def cycleOnce(self):
        self.system.log("Override this function")