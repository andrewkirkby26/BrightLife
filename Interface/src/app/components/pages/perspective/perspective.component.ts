import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Utils} from 'src/app/utils/utils';
import { EventService } from 'src/app/services/event.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Data, Router } from '@angular/router';
import { DataCacheService } from 'src/app/services/dataHolderService';
import { CommonComponent } from '../../components/common/common.component';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { FunctionsService } from 'src/app/firebase/functions.service';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { FormBuilder } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { GroupService } from 'src/app/services/group.service';
import { MessageService } from 'src/app/services/message.service';
import { PetService } from 'src/app/services/pet.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.css']
})
export class PerspectiveComponent  extends CommonComponent {
  
  constructor(public override authenticationService: AuthenticationService, public override navigationService: NavigationService, public override utils: Utils, public override eventService: EventService,  
    public override sanitizer: DomSanitizer, public override router: Router, public override dataCache: DataCacheService, public override firestoreService: FirestoreService, 
    public override functionsService: FunctionsService, public override firebaseServiceL: FirebaseService, public override formBuilder: FormBuilder, public override deviceService: DeviceService,
    public override groupService: GroupService, public override messageService: MessageService, public override petService: PetService, public override scheduleService: ScheduleService,
    public override eventsService: EventsService) {
    
    super(authenticationService, navigationService, utils, eventService,sanitizer, router, dataCache, firestoreService, functionsService, firebaseServiceL, formBuilder, 
      deviceService, groupService, messageService, petService, scheduleService, eventsService)

    this.navigationService.perspective = this;    
    let temp = this;

    setTimeout(function() {
      temp.updateBrowserTabTitle(null);
    },100);
  }

  browserTabSuffix = 'Home';
  tempHolderForDesiredNavItem : any | null = null;
  isTempHolderAView: boolean = false;
  /** Pages override this method... method needs work
   * 
   * Return:
   *  true: page has handled users request and navigatonService should not execute its go back
   *  false: page could NOT handle users request and navigationService should execute its go back
   */
  goBack(): boolean {
    return false; 
  }

  updateBrowserTabTitle(newVal: string | null) {
    if (newVal) {
      this.browserTabSuffix = newVal;
    }
    let ending = '';
    if (this.browserTabSuffix) {
      ending = this.browserTabSuffix;
    }
    document.title = this.environment.name + ' - ' + ending;
  }

  /** Pages override this method... method needs work
   * 
   * Return:
   *  true: page is allowing the use to be taken away from this page
   *  false: page has an error/popup that must be shown before use can navigate away
   */
  beforeAway(desiredNavItem: any, isView: boolean): boolean {
    this.tempHolderForDesiredNavItem = desiredNavItem;
    this.isTempHolderAView = isView;
    return true; 
  }

  navigateAway() {
    if (this.tempHolderForDesiredNavItem) {
      if (this.isTempHolderAView) {
        this.navigationService.setView(this.tempHolderForDesiredNavItem);
      }
    }
  }

  override ngOnInit() {
    super.ngOnInit();
  }
}
