from Base.Util.BaseUtil import BaseUtil
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
from Base.Entities.Message import Message
# from PyAccessPoint import pyaccesspoint
import os 

class AccessPointUtil(BaseUtil):
    
    access_point = ""
    name = "Access Point"
    online = False
    
    def __init__(self, system):
        super().__init__(system)
        # self.access_point = pyaccesspoint.AccessPoint()

    def start(self): 
        self.system.log("Turning on Access Point")
        self.online = True
        os.system("nmcli d wifi hotspot ifname wlan0 ssid BrightLife-Setup password BrightLife")
    
    def stop(self): 
        self.system.log("Turning off Access Point")
        os.system("nmcli c down Hotspot")
        os.system("nmcli c delete Hotspot")
        self.online = False
        
    def isOn(self):
        return self.online

    # def isOn(self): 
    #     return self.access_point.is_running()