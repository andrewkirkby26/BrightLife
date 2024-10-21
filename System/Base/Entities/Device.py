from datetime import date
import string

class Device:
    
    data = {}
    ownerID = ''
    serialNo = ''
    name = ''
    type = ''

    def __init__(self, ownerID: str, serialNo: str, name: str, type: str, data):
        self.ownerID = ownerID
        self.serialNo = serialNo
        self.name = name
        self.type = type
        self.data = data

    def get_ownerID(self):
        return self.ownerID

    def set_ownerID(self, value):
        self.ownerID = value

    def get_serialNo(self):
        return self.serialNo

    def set_serialNo(self, value):
        self.serialNo = value

    def get_name(self):
        return self.name

    def set_name(self, value):
        self.name = value

    def get_type(self):
        return self.type

    def set_type(self, value):
        self.type = value

    def get_data(self):
        return self.data

    def set_data(self, value):
        self.data = value

    def put_data(self, name: string, val):
        if self.data is None:
            self.data = {}
            
        self.data[name] = val
        return self
    
    def get_data_by_name(self, name: str, default = None):
        rVal = default
        if self.data is None:
            self.data = {}

        check = self.data[name]

        if (check is not None):
            rVal = check

        return rVal
    
    def clone(c):
        return Device(c['ownerID'], c['serialNo'], c['name'], c['type'], c['data'])