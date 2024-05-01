from Base.Util.BaseUtil import BaseUtil
from Base.Components.DigitalOutput import DigitalOutput
from Base import BaseConstants as BaseConstants
from LaserTainer import LasterTainerConstants
from Base.Components.Servo import Servo

class FeederSubsystem(BaseUtil):

    name = 'FeederSubsystem'

    def init(self):
        print('Initializing Subsystem')