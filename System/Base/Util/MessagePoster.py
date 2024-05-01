from Base.Util.BaseUtil import BaseUtil
from Base.Firebase.FireStoreUtil import FireStoreUtil
from Base.Monitors.BaseMonitor import BaseMonitor
from Base import BaseConstants 

class MessagePoster(BaseUtil):

    fs: FireStoreUtil = None
    name = "Message poster"
    
    def __init__(self, system):
        super().__init__(system)
        self.fs = self.system.getFirestoreUtil()

    def postMessage(self, message):
        self.system.log('Posting Message')
        self.fs.postDocument(message, BaseConstants.COLLECTION_MESSAGES)