from Base.Util.BaseUtil import BaseUtil
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 

class EventPoster(BaseUtil):

    fs: FireStoreUtil = None
    name = "Event poster"
    
    def __init__(self, system):
        super().__init__(system)
        self.fs = self.system.getFirestoreUtil()

    def postEvent(self, event):
        self.system.log('Posting Event')
        self.fs.postDocument(event, BaseConstants.COLLECTION_EVENTS)