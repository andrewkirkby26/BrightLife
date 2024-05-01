import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'addDevice',
  templateUrl: './addDevice.component.html',
  styleUrls: ['./addDevice.component.css', '../perspective/perspective.component.css']
})
export class AddDevicePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Register Device'
  
}
