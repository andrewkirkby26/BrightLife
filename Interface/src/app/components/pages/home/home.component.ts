import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { max } from 'rxjs';
import { Device } from 'src/app/interfaces/devices/device';
import { PerspectiveComponent } from '../perspective/perspective.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../perspective/perspective.component.css']
})
export class HomePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Home'
  lastScrollLeft = 0;
  leftMask = false;
  rightMask = true;

  override ngOnInit(): void {
    super.ngOnInit();

    let topScroller = document.querySelector('#topScroller')!;

    topScroller!.addEventListener('scroll', (e) => {
      let elem = (topScroller as HTMLElement);
      let width = elem.offsetWidth;
      let scrollLeft = elem.scrollLeft;
      let lastElem = (elem.childNodes[elem.childElementCount - 1] as HTMLElement)
      let startOfLastElem = lastElem.offsetLeft
      let widthOfLastElem = lastElem.offsetWidth;
      let maxRightView = width + scrollLeft;
      let neededMaxRight = startOfLastElem + widthOfLastElem;

      let allowed = 10;
      this.leftMask = scrollLeft > allowed;
      this.rightMask = neededMaxRight - maxRightView > allowed;
    });

    let scroller = document.querySelector('#homeScrollContainer')!;

    scroller!.addEventListener('scroll', (e) => {
      let children = scroller.getElementsByClassName('x_panel_container');
      let width = (scroller! as HTMLElement).offsetWidth;
      let scrollLeft = scroller!.scrollLeft;
      let simScroll = scrollLeft;
      for (let i = children.length - 1; i >= 0; i--) {
        let child = children[i];
        if (child) {
          let offset = (child as HTMLElement).offsetLeft;

          if (scrollLeft > this.lastScrollLeft) {
            simScroll += width - 1;
         }
          if (simScroll >= offset) {
            //Found our winner
            let id = child.id;
            let topElement: any;

            if (id.toLowerCase().indexOf('dashboard') != -1) {
              this.navigationService.selectDevice(null);
              topElement = (document.querySelector('#TOPDashboard')! as HTMLElement);
              let parent = topElement.parentElement;
              parent.scrollLeft = 0;
            } else {
              id = id.replace('DEVICE', '');
              let dev = this.deviceService.getDeviceById(id);
              if (dev) {
                this.navigationService.selectDevice(dev);
                topElement = (document.querySelector('#TOP' + dev.serialNo)! as HTMLElement);
                let offset = topElement.offsetLeft;
                let parent = topElement.parentElement;
                parent.scrollLeft = offset;
              }
            }
            break;
          }
        }
      }

      this.lastScrollLeft = scrollLeft;
    })
  }

  selectTopObject(device: Device | null) {
    let bottomElem: any;
    let topElem: any;
    let topScroll = 0;
    let bottomScroll = 0;

    if (device) {
      this.navigationService.selectDevice(device);
      topElem = document.getElementById('TOP' + device.serialNo);
      bottomElem = document.getElementById('DEVICE' + device.serialNo);
      topScroll = topElem.offsetLeft;
      bottomScroll = bottomElem.offsetLeft;
    } else {
      this.navigationService.selectDevice(null);
      topElem = document.getElementById('TOPDashboard');
      bottomElem = document.getElementById('Dashboard');
    }

    //First lets do the bottom portion
    let topParent = topElem.parentElement;
    let bottomParent = bottomElem.parentNode;

    topParent.scrollLeft = topScroll;
    bottomParent.scrollLeft = bottomScroll;
  }
}
