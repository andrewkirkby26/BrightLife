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
import { DeviceEvent } from 'src/app/interfaces/event';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends CommonComponent {
  
  @Input()
  event: DeviceEvent | null = null;

}
