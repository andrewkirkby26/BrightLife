from Base.Util.BaseUtil import BaseUtil
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
from Base.Entities.DeviceData import DeviceData
from Base.Entities.Device import Device
from Base.Entities.Schedule import Schedule

class DeviceDataFetcher(BaseUtil):

    fs: FireStoreUtil = None
    name = "Config Fetcher"
    
    def __init__(self, system):
        super().__init__(system)
        self.fs = self.system.getFirestoreUtil()
        self.execute()

    def execute(self):
        devJSON = self.fs.getDocument(BaseConstants.COLLECTION_DEVICES, self.system.getSerialNo())
        if (devJSON is not None):
            device = Device.clone(devJSON)

            schedules = []
            schedJSON = self.fs.getDocumentsByQuery(BaseConstants.COLLECTION_SCHEDULES, 'deviceID', '==', self.system.getSerialNo())
            if (schedJSON is not None and len(schedJSON) > 0):
                for sched in schedJSON:
                    schedules.append(Schedule.clone(sched))

            device_data = DeviceData(
                device,
                [],
                self.fs.getDocumentsByQuery(BaseConstants.COLLECTION_PETS, 'deviceIDs', 'array_contains', self.system.getSerialNo()),
                schedules
            )

            self.system.setDeviceData(device_data)