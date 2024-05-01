import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../perspective/perspective.component.css']
})
export class HistoryPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'History'
  
}
