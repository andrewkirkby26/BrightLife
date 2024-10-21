from Base.Monitors.BaseMonitor import BaseMonitor
from Base.Components.DigitalOutput import DigitalOutput
from Base import BaseConstants as BaseConstants
from LaserTainer import LasterTainerConstants
from Base.Components.Servo import Servo

class ArmSubsystem(BaseMonitor):

    name = 'LaserSubsystem'
    shoulder = None
    elbow = None

    angle = 0

    def init(self):
        self.shoulder = Servo(self.gpio, LasterTainerConstants.PIN_SHOULDER)
        self.elbow = Servo(self.gpio, LasterTainerConstants.PIN_ELBOW)

        super().init()

    def cycleOnce(self):
        self.angle = self.angle + 1

        self.shoulder.setAngle(self.angle)
        self.elbow.setAngle(self.angle)

        if (self.angle >= 180):
            self.angle = 0