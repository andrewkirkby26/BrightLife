from Base.Monitors.BaseMonitor import BaseMonitor
import time
import threading
from Base import BaseConstants 

class MessageRequest(BaseMonitor):
    db = None
    name = 'Message Request'
    callback = threading.Event()

    def init(self):
        self.db = self.system.firestoreUtil.db
        self.db.collection(BaseConstants.COLLECTION_COMMANDS).document(self.system.getSerialNo()).on_snapshot(self.messageRecieved)
        self.system.firestoreUtil.postDocument({'command': None}, BaseConstants.COLLECTION_COMMANDS,self.system.getSerialNo() )
        self.daemon = True
        self.start()

    def cycleOnce(self):
        time.sleep(1)

    def messageRecieved(self, docs, changes, read_time):
        for doc in docs:
            value = doc.to_dict()['command']
            if value is not None:
                self.system.executeRequest(value)
                self.system.firestoreUtil.postDocument({'command': None}, BaseConstants.COLLECTION_COMMANDS,self.system.getSerialNo() )