from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
from datetime import date
import threading
import traceback
import os
import time
from Base.Components.DigitalInput import DigitalInput
from Base.Monitors.BaseMonitor import BaseMonitor

class ResetHardwareMonitor(BaseMonitor):

    loopCount = 0
    system = None
    gpio = None
    name = "Reset Hardware Monitor"
    resetButton = None
    resetButtonPressStartTime = None
    wifiUtil = None
    accessPoint = None
    
    def postInit(self):
        self.resetButton = DigitalInput(self.gpio, BaseConstants.PIN_RESET_BUTTON)
        self.wifiUtil = self.system.getWifiUtil()
        self.accessPoint = self.system.getAccessPoint()
        # startAccessPointOnLaunch = os.getenv('START_AS_HOTSPOT')
        
        # # if startAccessPointOnLaunch is None:
        # #     startAccessPointOnLaunch = True
            
        # if (startAccessPointOnLaunch == "True" or startAccessPointOnLaunch == True):
        #     self.system.getAccessPoint().start()
    
    def cycleOnce(self):
        
        if (not self.wifiUtil.isConnected()):
            if (not self.accessPoint.isOn()):
                self.accessPoint.start()
                
        # if (self.isResetButtonPressed()):
        #     if (self.resetButtonPressStartTime is not None):
        #         nowMS = round(time.time() * 1000)
        #         diff = nowMS - self.resetButtonPressStartTime
                
        #         if (diff > 3):
        #             self.system.log('Reset button held down for 3s')
        #             self.system.getAccessPoint().start()
        #     else:
        #         self.resetButtonPressStartTime = round(time.time() * 1000)
                
        # else:
        #     self.resetButtonPressStartTime = None
            
    def isResetButtonPressed(self):
        return self.resetButton.isOn()