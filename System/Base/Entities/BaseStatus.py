from datetime import date
import string

class BaseStatus:
    createTime = -1
    state: string
    message: string
    deviceID: string
    data: dict
    
    def __init__(self, c, s: string, m: string, d: dict, dat: string):
        self.createTime = c
        self.state = s
        self.message = m
        self.data = d
        self.deviceID = dat

    def getCreateTime(self):
        return self.createTime

    def setCreateTime(self, param):
        self.createTime = param
        return self

    def getData(self) -> dict:
        return self.data
    
    def setData(self, param: dict):
        self.data = param
        return self
        
    def putData(self, name: string, val):
        if self.data is None:
            self.data = {}
            
        self.data[name] = val
        return self
        
    def getMessage(self) -> string:
        return self.message
    
    def setMessage(self, param: string):
        self.message = param
        return self
        
    def getState(self) -> string:
        return self.state
    
    def setState(self, param: string):
        self.state = param
        return self
        
    def j_serial(self, o):     # self contained
        from datetime import datetime, date
        return str(o).split('.')[0] if isinstance(o, (datetime, date)) else None