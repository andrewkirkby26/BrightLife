from Base.Util.BaseUtil import BaseUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base.Entities.Message import Message
import dbus, uuid, sys
import os
import subprocess
import time


class WifiUtil(BaseUtil):
    
    name = "Wifi Util"
    
    def postInit(self):
        self.setHostname("BrightLife-" + self.system.getSerialNo())
    
    def listAvailableConnections(self):
        # os.system("nmcli dev wifi list")
        result = subprocess.run(["nmcli", "--terse", "device", "wifi", "list", "--rescan", "yes"], capture_output=True, text=True)
        output = result.stdout.strip()
        output = output.splitlines()
        
        connectionNames = []
        rVal = []
        for connection in output:
            connection = connection[25:]
            if (not connection.startswith(":") and "Infra" in connection):
                segments = connection.split(":")
                name = segments[0]
                
                if (not name in connectionNames):
                    connectionNames.append(name)
                    signal = segments[4]
                    hasPWD = connection.endswith("WPA2") or connection.endswith("WPA3")
                    
                    rVal.append({
                        "name": name,
                        "signal": signal,
                        "hasPassword": hasPWD
                    })
        
        return rVal
    
    def connectToWifi(self, SSID, PASSWORD):
        print('Connecting WiFi to ' + SSID)
        # command = ["nmcli", "device", "wifi", "connect", SSID]
        command = "nmcli device wifi connect " + SSID
        if (PASSWORD is not None and PASSWORD != "" and PASSWORD != "="):
            # command.append("password")
            # command.append(PASSWORD)
            command = command + " password " + PASSWORD
            
        return os.system(command)
        
    def disconnect(self):
        if (self.isConnected()):
            check = self.getCurrent()
            os.system('nmcli conn down ' + self.getWifiName())
        
    def isConnected(self):
        check = self.getCurrent()
        return check.split(":")[0] == "yes"
    
    def setHostname(self, name):
        # os.system("nmcli general hostname " + name)
        time.sleep(0)
        
    def getCurrent(self):
        result = subprocess.run(["nmcli", "-t", "-f", "active,ssid", "dev", "wifi"], capture_output=True, text=True)
        output = result.stdout.strip().splitlines()
        rVal = "no:Not Connected"
        if (output is not None and len(output) > 0):
            for line in output:
                if (line.startswith("yes")):
                    rVal = line
            
        return rVal
    
    def getWifiName(self):
        if (self.isConnected()):
            check = self.getCurrent()
            return check.split(":")[1]
