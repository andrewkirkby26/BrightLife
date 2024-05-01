import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'schedulepage',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css', '../perspective/perspective.component.css']
})
export class SchedulePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Schedule'
  
}
