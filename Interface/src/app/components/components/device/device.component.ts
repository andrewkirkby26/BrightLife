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

@Component({
  selector: 'devicetile',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceTileComponent extends CommonComponent {

  @Input()
  device: Device | null = null;

  override ngOnInit(): void {
    super.ngOnInit()
  }
}
