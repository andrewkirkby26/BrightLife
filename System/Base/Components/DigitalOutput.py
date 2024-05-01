from Base import BaseConstants

class DigitalOutput:
    port = 0
    GPIO = None
    isOn = False

    def __init__(self, gpio, port, initialStatus):
        self.GPIO = gpio
        self.port = port
        self.isOn = initialStatus
        if not BaseConstants.IS_DEV:
            self.GPIO.setup(self.port,self.GPIO.OUT)
            self.GPIO.output(self.port, initialStatus) 

    def getPort(self):
        return self.port

    def setPort(self, port):
        self.port = port

    def isHigh(self):
        return self.isOn

    def turnOn(self):
        self.isOn = True
        if not BaseConstants.IS_DEV:
            self.GPIO.output(self.port, self.GPIO.HIGH) 

    def turnOff(self):
        self.isOn = False
        if not BaseConstants.IS_DEV:
            self.GPIO.output(self.port, self.GPIO.LOW) 

            
        