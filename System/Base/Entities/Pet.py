from datetime import date
import string

class Pet:
    
    name = ''
    deviceIDs = []
    ownerID = ''
    type = ''

    def __init__(self, name: str, ownerID: str, type: str, deviceIDs: list):
        self.name = name
        self.deviceIDs = deviceIDs
        self.ownerID = ownerID
        self.type = type

    def get_name(self):
        return self.name

    def set_name(self, value):
        self.name = value

    def get_deviceIDs(self):
        return self.deviceIDs

    def set_deviceIDs(self, value):
        self.deviceIDs = value

    def get_ownerID(self):
        return self.ownerID

    def set_ownerID(self, value):
        self.ownerID = value

    def get_type(self):
        return self.type

    def set_type(self, value):
        self.type = value
