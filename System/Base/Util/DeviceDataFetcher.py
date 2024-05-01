from Base.Util.BaseUtil import BaseUtil
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
from Base.Entities.DeviceData import DeviceData

class DeviceDataFetcher(BaseUtil):

    fs: FireStoreUtil = None
    name = "Config Fetcher"
    
    def __init__(self, system):
        super().__init__(system)
        self.fs = self.system.getFirestoreUtil()
        self.execute()

    def execute(self):
        device_data = DeviceData()

        device_data.device = self.fs.getDocument(BaseConstants.COLLECTION_DEVICES, self.system.getSerialNo())
        device_data.schedules = self.fs.getDocumentsByQuery(BaseConstants.COLLECTION_SCHEDULES, 'deviceID', '==', self.system.getSerialNo())
        device_data.pets = self.fs.getDocumentsByQuery(BaseConstants.COLLECTION_PETS, 'deviceIDs', 'array_contains', self.system.getSerialNo())

        self.system.setDeviceData(device_data)