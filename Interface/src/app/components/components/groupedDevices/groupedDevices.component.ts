import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'groupeddevices',
  templateUrl: './groupedDevices.component.html',
  styleUrls: ['./groupedDevices.component.css'],
  animations: [

  ]
})
export class GroupedDevicesComponent extends CommonComponent {

  @Input()
  groups: any[] = [];
}
