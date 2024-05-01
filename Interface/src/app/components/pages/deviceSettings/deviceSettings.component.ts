import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'deviceSettings',
  templateUrl: './deviceSettings.component.html',
  styleUrls: ['./deviceSettings.component.css', '../perspective/perspective.component.css']
})
export class DeviceSettingsPageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Device Settings'

  saveDevice() {
    if (this.deviceService.deviceForChanges) {
      if (this.deviceService.deviceForChanges.isLaserTainer()) {
        let yawMin = parseInt(this.deviceService.deviceForChanges.data.yawMin);
        let yawMax = parseInt(this.deviceService.deviceForChanges.data.yawMax);
        let pitchMin = parseInt(this.deviceService.deviceForChanges.data.pitchMin);
        let pitchMax = parseInt(this.deviceService.deviceForChanges.data.pitchMax);

        this.deviceService.deviceForChanges.data.yawMin = Math.min(yawMin, yawMax);
        this.deviceService.deviceForChanges.data.yawMax = Math.max(yawMin, yawMax);
        this.deviceService.deviceForChanges.data.pitchMin = Math.min(pitchMin, pitchMax);
        this.deviceService.deviceForChanges.data.pitchMax = Math.max(pitchMin, pitchMax);
      }
      this.deviceService.setDevice(this.deviceService.deviceForChanges);
      this.navigationService.jumpHome();
    }
  }
}
