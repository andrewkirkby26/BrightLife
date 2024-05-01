import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Button } from 'src/app/interfaces/button';

@Component({
  selector: 'mydialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  data: any = {
   
  };  

  constructor(@Inject(MAT_DIALOG_DATA) public body: any, public eventService: EventService) {
    this.data = body;
  }

  buttonClicked(button: Button) {
    button.emitter.emit(button.param);
    this.eventService.closeDialogReq.emit();
  }
}
