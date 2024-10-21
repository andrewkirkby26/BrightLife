from datetime import date

class Group:
    
    ownerID = ''
    name = ''
    deviceIDs = []

    def __init__(self, ownerID: str, name: str, deviceIDs):
        self.ownerID = ownerID
        self.name = name
        self.deviceIDs = deviceIDs

    def get_ownerID(self):
        return self.ownerID

    def set_ownerID(self, value):
        self.ownerID = value

    def get_name(self):
        return self.name

    def set_name(self, value):
        self.name = value

    def get_deviceIDs(self):
        return self.deviceIDs

    def set_deviceIDs(self, value):
        self.deviceIDs = value
