import os
import threading
import time
from google.cloud import pubsub_v1
os.environ['GOOGLE_APPLICATION_CREDENTIALS']="./Base/Firebase/brightlife-firebase-key.json"

import firebase_admin
from firebase_admin import firestore

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app()
db = firestore.client()

callback_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        print(f'Received document snapshot: {doc.id}')
    callback_done.set()

doc_ref = db.collection(u'Commands').document(u'LT-1')

# Watch the document
doc_watch = doc_ref.on_snapshot(on_snapshot)

while True:
    time.sleep(1)