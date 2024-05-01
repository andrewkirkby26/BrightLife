import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { NavigationService } from './navigation.service';
import { Constants } from '../constants/constants';
import { Observable, of } from 'rxjs';
import { Button } from 'src/app/interfaces/button';
import { domainToASCII } from 'url';
import { User } from 'src/app/interfaces/user';
import { catchError } from 'rxjs/internal/operators/catchError';
import {Utils} from '../utils/utils';
import { EventService } from './event.service';
import { getAuth, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { FirebaseService } from '../firebase/firebase.service';
import { FirestoreService } from '../firebase/firestore.service';
import { orderBy, where } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { Device } from '../interfaces/devices/device';
import { Message } from '../interfaces/message';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root',
})
export class MessageService{

  messages: Message[] = [];

  constructor(public http: HttpClient, public eventService: EventService, public authenticationService: AuthenticationService, public firebaseService: FirebaseService, public firestoreService: FirestoreService) { 
    this.eventService.updateMessagesReq.subscribe((resp) => {
      this.updateMessages();
    })
    this.eventService.userLoggedIn.subscribe(resp => {
      this.updateMessages();
    })

    this.eventService.userLoggedOut.subscribe(resp => {
      this.messages = [];
    })

    setInterval(() => {
      this.updateMessages();
    },15000);
  } 

  updateMessages() {
    try {
      this.firestoreService.queryForDocuments(Constants.COLLECTION_MESSAGES, where('ownerID', '==', this.authenticationService.user!.uid), orderBy("createTime", "desc")).then( messages => {
        this.messages = messages;
      })
    } catch (e) {

    }
  }

  getMessagesByDeviceId(id: string): Message[] {
    return this.messages.filter(function(item){
      return item.deviceID == id;         
    })
  }

  clearMessage(id: string) {
    this.firestoreService.deleteDocumentByCollectionAndName(Constants.COLLECTION_MESSAGES, id);
    this.updateMessages();
  }
}
