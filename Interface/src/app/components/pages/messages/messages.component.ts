import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'messagesPage',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../perspective/perspective.component.css']
})
export class MessagesPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Messages'
}
