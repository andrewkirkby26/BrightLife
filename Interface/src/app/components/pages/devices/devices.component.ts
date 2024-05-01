import { trigger, transition, style } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'devicesPage',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css', '../perspective/perspective.component.css']
})
export class DevicesPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Devices'
  groupedToggle = true;
  
}
