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
import { where } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { Device } from '../interfaces/devices/device';

@Injectable({
  providedIn: 'root',
})
export class PetService{


  constructor(public http: HttpClient, public eventService: EventService, public authenticationService: AuthenticationService, public firebaseService: FirebaseService, public firestoreService: FirestoreService) { 

  } 

}
