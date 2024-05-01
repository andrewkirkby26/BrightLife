from Base import BaseConstants

class DigitalInput:

    port = 0
    GPIO = None

    def __init__(self, gpio, port):
        self.GPIO = gpio
        self.port = port
        if not BaseConstants.IS_DEV:
            self.GPIO.setup(self.port,self.GPIO.IN, pull_up_down=self.GPIO.PUD_DOWN)

    def isOn(self):
        if not BaseConstants.IS_DEV:
            return self.GPIO.input(self.port) == 1
        else:
            return True

    def isOff(self):
        if not BaseConstants.IS_DEV:
            return not self.GPIO.input(self.port) == 1
        else:
            return False


    def read(self):
        if not BaseConstants.IS_DEV:
            return self.GPIO.input(self.port)
        else:
            return 1
            
        

        