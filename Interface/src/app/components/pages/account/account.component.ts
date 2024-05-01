import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../perspective/perspective.component.css']
})
export class AccountPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Account'
  
}
