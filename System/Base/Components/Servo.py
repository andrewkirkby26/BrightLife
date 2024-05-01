from Base import BaseConstants

if not BaseConstants.IS_DEV:
    import board
    import pwmio
    from adafruit_motor import servo

class Servo:
    port = 0
    servo = None
    angle = 0

    def __init__(self, gpio, port):
        self.GPIO = gpio
        self.port = port
        if not BaseConstants.IS_DEV:
            pwm = pwmio.PWMOut(self.port, duty_cycle=2 ** 15, frequency=50)
            self.servo = servo.Servo(pwm)
            self.servo.angle = None

    def setAngle(self, angle):
        self.angle = angle
        if not BaseConstants.IS_DEV:
            self.servo.angle = angle

    def read(self):
        return self.angle
            
        