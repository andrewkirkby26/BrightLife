from datetime import date

class Event:
    
    ownerID: str
    deviceID: str
    title = ''
    message = ''
    level = ''

    def __init__(self, ownerID: str, deviceID: str, title = None, message = None, level = None):
        self.deviceID = deviceID
        self.ownerID = ownerID
        self.title = title
        self.message = message
        self.level = level

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

    def get_message(self):
        return self.message

    def set_message(self, value):
        self.message = value

    def get_level(self):
        return self.level

    def set_level(self, value):
        self.level = value


    