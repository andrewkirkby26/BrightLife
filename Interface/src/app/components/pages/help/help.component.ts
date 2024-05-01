import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css', '../perspective/perspective.component.css']
})
export class HelpPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Help'
  
}
