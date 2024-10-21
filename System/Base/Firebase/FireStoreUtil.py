import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from Base.Entities.BaseStatus import BaseStatus
from Base import BaseConstants as Constants

class FireStoreUtil:
    cred = credentials.Certificate(Constants.FIREBASE_CRED_PATH)
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    def __init__(self, sys):
        self.system = sys
        
    def postDocument(self, document, collection1_id, document_id = None):
        doc_ref = self.db.collection(collection1_id)
        if (document_id is not None):
            doc_ref = doc_ref.document(document_id)
        else:
            doc_ref = doc_ref.document()
        if type(document) is not dict:
            document = document.__dict__
        doc_ref.set(document)

    def getDocument(self, collection_id, document_id):
        doc_ref = self.db.collection(collection_id).document(document_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return None

    def getDocumentsByQuery(self, collection_id, field, operator, compare):
        rVal = []
        docs = self.db.collection(collection_id).where(field, operator, compare).stream()
        
        for doc in docs:
            rVal.append(doc.to_dict())

        return rVal
    
    def getDB(self):
        return self.db
    
