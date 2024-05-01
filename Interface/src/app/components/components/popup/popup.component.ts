import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Button } from 'src/app/interfaces/button';
import { Device } from 'src/app/interfaces/devices/device';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'popupcom',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }), 
        animate(600, style({opacity: 1}))
      ]) ,
      transition(':leave', [
        style({ opacity: 1 }), 
        animate(600, style({opacity: 0}))
      ]) 
    ])
  ]
})
export class PopupComponent extends CommonComponent {
  
  getPopup() {
    let rVal = '';

    if (this.scheduleService.selectedSchedule) {
      rVal = 'Schedule';
    } else if (this.navigationService.popup) {
      rVal = this.navigationService.popup;
    }
    return rVal;
  }

  saveSchedule() {
    if (this.scheduleService.changeSchedule) {
      this.scheduleService.setSchedule(this.scheduleService.changeSchedule);
      this.navigationService.hideOverlay();
    }
  }

  executeDevice() {
    let param = $('#runTime').val();
    this.deviceService.sendRequestForDevice({command: 'execute', valueParam: param}, this.deviceService.selectedDevice!.serialNo);
    this.navigationService.closePopup();
  }

  parseInt(val: any) {
    return parseInt(val);
  }


  showDeleteChallenge() {
    this.navigationService.showDialog({
      header: 'Delete Schedule?',
      content: 'Are you sure you want to delete this schedule?',
      buttons: [new Button('Yes', null, this.scheduleService.deleteSelectedScheduleReq, 'warn')]
    })
  }
}
