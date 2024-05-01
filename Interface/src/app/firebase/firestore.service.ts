import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { getFirestore, Firestore, doc, deleteDoc, setDoc, getDoc,collection, query, where, getDocs,QueryFieldFilterConstraint, onSnapshot, QueryOrderByConstraint, QueryLimitConstraint  } from "firebase/firestore";
import { Observable, of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService{

  db: Firestore;

  constructor(public firebaseService: FirebaseService) {
    this.db = getFirestore(firebaseService.app);
  }

  async getDocumentByCollectionAndName(collection: string, docName: string){
    const docRef = doc(this.db, collection, docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data: any = docSnap.data();
      data._id = docSnap.id;
      return data;
    } else {
      return null;
    }
  }

  async queryForDocuments(coll_name: string, qu: QueryFieldFilterConstraint, order?: QueryOrderByConstraint | null, limit?: QueryLimitConstraint | null) {
    let rVal: any[] = [];
    let coll_ref = collection(this.db, coll_name);
    let q = query(coll_ref, qu);
    if (order) {
      if (limit) {
        q = query(coll_ref, qu, order, limit);
      } else {
        q = query(coll_ref, qu, order);
      }
    } else if (limit) {
      q = query(coll_ref, qu, limit);
    }

    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data: any = doc.data();
      data._id = doc.id;
      rVal.push(data);
    });
    return rVal;
  }

  async deleteDocumentByCollectionAndName(collection: string, docName: string){
    const docRef = doc(this.db, collection, docName);
    await deleteDoc(docRef);
  }

  async setDocument(collection: string, docName: string, docObj: any) {
    await setDoc(doc(this.db, collection, docName), Object.assign({}, docObj));
  }

  subscribeToChangeByQuery(coll_name: string, qu: QueryFieldFilterConstraint) {
    
  }
}
