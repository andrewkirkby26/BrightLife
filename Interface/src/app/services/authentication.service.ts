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
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService{

  auth: Auth;
  /** Variable used to ensure service goes after correct REST endpoing */
  endpoint!: string;
  changeUser: User | null = null;
  /** Variable that is equal to currently active user (null if not logged in) */
  user: User | null = null;
  /** Boolean depicting if the service is initialized successfully yet */
  initialized = false;
  /** Variable that is a string if there is an error upon trying to confirm that we need to show the user (null if no error) */
  confirmationError: string | null = null;
  /** Boolean depicting whether we are trying to confirm the user access level currently */
  attemptingToConfirm = false;
  userApprovedForUse = false;
  firstCheck = true;
  

  constructor(public http: HttpClient, public eventService: EventService, public firebaseService: FirebaseService, public firestoreService: FirestoreService) { 
    this.auth = getAuth(firebaseService.app);

    // this.login('andrew.kirkby26@gmail.com', 'Sandy247!')
    // this.logout();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.firestoreService.getDocumentByCollectionAndName(Constants.COLLECTION_USERS, user.uid).then(elem => {
          this.initialized = true;
          if (elem) {
            this.user = new User(elem['firstName'], elem['lastName'],user.uid, user.email, null, elem['preferences']);
            console.log(this.user);

            this.eventService.userLoggedIn.emit(this.user);
            if (this.firstCheck) {
              this.firstCheck = false;
              this.userApprovedForUse = true;
            } else {
              setTimeout(() => {
                this.userApprovedForUse = true;
              },500);
            }
          }
        });
      } else {
        console.log('no user')
        this.initialized = true;
        this.user = null;
        this.changeUser = null;
        this.eventService.userLoggedOut.emit();
      }
    });

    this.eventService.logoutUserReq.subscribe(resp => {
      this.logout();
    })
  } 

  login(email: string, password: string) {
    let loginError = null;
    if (!email || email == '') {
      loginError = 'Email is required.'
    } else if (!password || password == '') {
      loginError = 'Password is required.'
    }

    if (loginError) {
      this.eventService.showAlertReq.emit({message: loginError});
      return;
    }

    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setTimeout(() => {
        (document.getElementById("loginForm")! as HTMLFormElement).reset();
      },1500);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = 'Unable to Sign In';
      if (errorCode == 'auth/invalid-email') {
        errorMessage = 'Invalid email supplied.';
      } else if (errorCode == 'auth/wrong-password') {
        errorMessage = 'Incorrect password supplied.';
      } else if (errorCode == 'auth/user-not-found') {
        errorMessage = 'No user found with that email.';
      } else if (errorCode == 'auth/too-many-requests') {
        errorMessage = 'You have tried to login too many times, please try again later.';
      }

      this.eventService.showAlertReq.emit({message: errorMessage});
    });
  }

  createUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });


    //GOTTA add user object to firestore
  }

  setUser(user: User) {
    if (user) {
      this.firestoreService.setDocument(Constants.COLLECTION_USERS, user.uid, 
        {
          'firstName': user.firstName,
          'lastName': user.lastName,
          'preferences': user.preferences
        }
      );
      this.firestoreService.getDocumentByCollectionAndName(Constants.COLLECTION_USERS, user.uid).then(elem => {
        if (elem) {
          this.user = new User(elem['firstName'], elem['lastName'],user.uid, user.email, null, elem['preferences']);
          console.log(this.user);
        }
      });
    }
  }

  canSaveUser() {
    let rVal = false;

    if (this.user && this.changeUser) {
      if (this.changeUser.firstName && this.changeUser.lastName) {
        if (this.user.firstName != this.changeUser.firstName || 
          this.user.lastName != this.changeUser.lastName) {
            rVal = true;
        }
      }
    }

    return rVal;
  }

  prepUserForChange() {

  }

  logout() {
    this.eventService.closeNavbar.emit();
    this.user = null;
    this.userApprovedForUse = false;
    signOut(this.auth)
    .then(() => {

    })
  }
}
