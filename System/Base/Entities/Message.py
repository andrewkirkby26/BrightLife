from datetime import date

class Message:
    
    deviceID: str
    ownerID: str
    title = ''
    level = ''
    createTime = -1

    def __init__(self, deviceID: str, ownerID: str, title: str, level: str, createTime: int):
        self.deviceID = deviceID
        self.ownerID = ownerID
        self.title = title
        self.level = level
        self.createTime = createTime

    def get_deviceID(self):
        return self.deviceID

    def set_deviceID(self, value):
        self.deviceID = value

    def get_ownerID(self):
        return self.ownerID

    def set_ownerID(self, value):
        self.ownerID = value

    def get_title(self):
        return self.title

    def set_title(self, value):
        self.title = value

    def get_level(self):
        return self.level

    def set_level(self, value):
        self.level = value

    def get_createTime(self):
        return self.createTime

    def set_createTime(self, value):
        self.createTime = value

    