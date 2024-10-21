from datetime import date
import string
from Base.Entities.Device import Device

class DeviceData:
    
    device: Device = None
    groups = []
    pets = []
    schedules = []

    def __init__(self, device: Device, groups, pets, schedules):
        self.device = device
        self.groups = groups
        self.pets = pets
        self.schedules = schedules


    def get_device(self):
        return self.device

    def set_device(self, value):
        self.device = value

    def get_groups(self):
        return self.groups

    def set_groups(self, value):
        self.groups = value

    def get_pets(self):
        return self.pets

    def set_pets(self, value):
        self.pets = value

    def get_schedules(self):
        return self.schedules

    def set_schedules(self, value):
        self.schedules = value

