from Base.Monitors.BaseMonitor import BaseMonitor
from Base.Components.DigitalOutput import DigitalOutput
from Base import BaseConstants as BaseConstants
from LaserTainer import LasterTainerConstants
from Base.Util.BaseUtil import BaseUtil

class LaserSubsystem(BaseUtil):

    name = 'LaserSubsystem'
    laser: DigitalOutput = None

    def init(self):
        self.laser = DigitalOutput(self.gpio, LasterTainerConstants.PIN_LASER, 0)

    def turnOnLaser(self):
        self.laser.turnOn()

    def turnOffLaser(self):
        self.laser.turnOff()