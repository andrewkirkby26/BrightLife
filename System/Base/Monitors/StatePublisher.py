from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 
import time

class StatePublisher(BaseMonitor):

    name = "State Publisher"
    
    def cycleOnce(self):
        self.postState()

    def postState(self):
        state = self.system.getStatus()
        # self.system.log('Posting State: ' + state.getState())
        fs = self.system.getFirestoreUtil()
        state.setCreateTime(time.time() * 1000)
        fs.postDocument(state, BaseConstants.COLLECTION_STATUS, self.system.getSerialNo())