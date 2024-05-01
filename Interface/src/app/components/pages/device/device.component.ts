import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from 'src/app/interfaces/devices/device';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'devicePage',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css', '../perspective/perspective.component.css']
})
export class DevicePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Device'

  @Input()
  device: Device | null = null;

  stopExecuting() {
    this.deviceService.sendRequestForDevice({command: 'stop'}, this.device!.serialNo);
  }
}
