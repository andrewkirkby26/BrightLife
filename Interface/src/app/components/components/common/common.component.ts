import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { timeStamp } from 'console';
import { NavigationService } from 'src/app/services/navigation.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Utils} from 'src/app/utils/utils';
import { EventService } from 'src/app/services/event.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataCacheService } from 'src/app/services/dataHolderService';
import { Constants } from 'src/app/constants/constants';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { FunctionsService } from 'src/app/firebase/functions.service';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { GroupService } from 'src/app/services/group.service';
import { MessageService } from 'src/app/services/message.service';
import { PetService } from 'src/app/services/pet.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnChanges, OnInit, OnDestroy{ 
  environment = environment;
  Constants = Constants;
  pollRate = 1000;
  Utils = Utils;
  @Input()
  pstyle: { [klass: string]: any; } = {};
  @Input()
  pclass: any = '';
  DESTROYED = false;
  pollStarted = false;
  subscriptions: Subscription[] = [];
  numberOfPolls = 0;
  pollTimerId: any | null = null;
  shouldPollBase = true;
  JSON = JSON;
  
  constructor(public authenticationService: AuthenticationService, public navigationService: NavigationService, public utils: Utils, public eventService: EventService,  
    public sanitizer: DomSanitizer, public router: Router, public dataCache: DataCacheService, public firestoreService: FirestoreService, 
    public functionsService: FunctionsService, public firebaseServiceL: FirebaseService, public formBuilder: FormBuilder, public deviceService: DeviceService,
    public groupService: GroupService, public messageService: MessageService, public petService: PetService, public scheduleService: ScheduleService,
    public eventsService: EventsService) { 
  }


  ngOnDestroy() {
    this.DESTROYED = true;
    clearTimeout(this.pollTimerId);
    this.subscriptions.forEach(function ( subscription) {
      try {
        subscription.unsubscribe();
      } catch (e) {

      }
    })
  }

  //To be overriden where needed
  ngOnChanges(changes: SimpleChanges) {

  }

  //To be oberriden where needed
  ngOnInit() {
    if (!this.pollStarted) {
      this.pollStarted = true;
      this.poll();
    }
  }

  addSubscription(sub: Subscription) {
    this.subscriptions.push(sub);
  }
  
  poll() {
    if (!this.DESTROYED && this.shouldPollBase) {
      this.numberOfPolls++;
      try {
        this.cycleOnce();
      } catch (e) {
        
      }

      let temp = this;
      this.pollTimerId = setTimeout(function() {
        temp.poll();
      },this.pollRate);
    }
  }

  //To be oberriden where needed
  cycleOnce() {
    this.shouldPollBase = false;
  }
}
