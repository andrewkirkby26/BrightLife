from datetime import date
import string

class Schedule:
    
    ownerID = ''
    type = ''
    days = []
    deviceID = ''
    valueParam = 0
    time = ''
    command = ''
    enabled = True

    def __init__(self, ownerID: str, type: str, days: list, deviceID: str, valueParam:int, time: str, command: str, enabled: bool):
        self.ownerID = ownerID
        self.type = type
        self.days = days
        self.deviceID = deviceID
        self.valueParam = valueParam
        self.time = time
        self.command = command
        self.enabled = enabled

    def get_ownerID(self):
        return self.ownerID

    def set_ownerID(self, value):
        self.ownerID = value

    def get_type(self):
        return self.type

    def set_type(self, value):
        self.type = value

    def get_days(self):
        return self.days

    def set_days(self, value):
        self.days = value

    def get_deviceID(self):
        return self.deviceID

    def set_deviceID(self, value):
        self.deviceID = value

    def get_valueParam(self):
        return self.valueParam

    def set_valueParam(self, value):
        self.valueParam = value

    def get_time(self):
        return self.time

    def set_time(self, value):
        self.time = value

    def get_command(self):
        return self.command

    def set_command(self, value):
        self.command = value

    def get_enabled(self):
        return self.enabled

    def set_enabled(self, value):
        self.enabled = value

    def clone(c):
        return Schedule(c['ownerID'], c['type'], c['days'], c['deviceID'], c['valueParam'], c['time'], c['command'], c['enabled'])