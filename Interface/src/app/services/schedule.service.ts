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
import { Schedule } from '../interfaces/schedule';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService{

  schedules: Schedule[] = [];
  selectedSchedule: Schedule | null = null;
  changeSchedule: Schedule | null = null;

  @Output()
  deleteSelectedScheduleReq: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient, public eventService: EventService, public authenticationService: AuthenticationService, 
    public firebaseService: FirebaseService, public firestoreService: FirestoreService, public deviceService: DeviceService) { 
    this.eventService.updateSchedulesReq.subscribe((resp) => {
      this.updateSchedules();
    })
    this.eventService.userLoggedIn.subscribe(resp => {
      this.updateSchedules();
    })

    this.deleteSelectedScheduleReq.subscribe(resp => {
      if (this.selectedSchedule && this.selectedSchedule._id != '') {
        this.deleteScheduleById(this.selectedSchedule?._id);
        this.selectSchedule(null);
        this.eventService.closeOverlayReq.emit();
      }
    })

    this.eventService.userLoggedOut.subscribe(resp => {
      this.schedules = [];
    })

    // setInterval(() => {
    //   this.updateSchedules();
    // },30000);
  } 

  updateSchedules() {
    try {
      this.firestoreService.queryForDocuments(Constants.COLLECTION_SCHEDULES, where('ownerID', '==', this.authenticationService.user!.uid)).then( temp => {
        let schedules: Schedule[] = [];
        temp.forEach((sched) => {
          let schedule = new Schedule(sched);
          schedules.push(schedule);
        }); 
        this.schedules = schedules.sort(Utils.sortByProperty('name'));
        console.log(schedules)
      })
    } catch (e) {

    }
  }

  selectSchedule(schedule: Schedule | null) {
    this.selectedSchedule = schedule;
    this.prepScheduleForChange();
  }

  prepScheduleForChange() {
    this.changeSchedule = this.selectedSchedule ? new Schedule(this.selectedSchedule) : null;
  }

  setSchedule(schedule: Schedule) {
    if (schedule._id == '') {
      schedule._id =  Utils.createDomId(25);
    }
    schedule.ownerID = this.authenticationService.user!.uid;
    this.firestoreService.setDocument(Constants.COLLECTION_SCHEDULES, schedule._id, (schedule as any));
    this.deviceService.askDeviceToPullConfig(schedule.deviceID);
    setTimeout(() => {
      this.updateSchedules();
    },250);
  }

  deleteScheduleById(id: string) {
    this.firestoreService.deleteDocumentByCollectionAndName(Constants.COLLECTION_SCHEDULES, id);
    this.updateSchedules();
  }

  canSaveSchedule() {
    let rVal = false;
    if (this.selectedSchedule && this.changeSchedule) {
      if (this.changeSchedule.name && this.changeSchedule.time) {
        if (this.selectedSchedule.name != this.changeSchedule.name ||
          this.selectedSchedule.enabled != this.changeSchedule.enabled || 
          !Utils.arraysMatch(this.selectedSchedule.days, this.changeSchedule.days, false) || 
          this.selectedSchedule.time != this.changeSchedule.time || 
          this.selectedSchedule.valueParam != this.changeSchedule.valueParam || 
          this.selectedSchedule.deviceID != this.changeSchedule.deviceID) {
          rVal = true;
        }
      }
    } 

    return rVal;
  }

  getSchedulesByDeviceId(id: string): Schedule[] {
    return this.schedules.filter(function(item){
      return item.deviceID == id;         
    }) 
  }
}
