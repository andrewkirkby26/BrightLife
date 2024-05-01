import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {FirebaseConstants} from "../constants/firebaseConstants";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService{
 
  app = initializeApp(FirebaseConstants.config);
}
