import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class EventService{

  @Output() jumpToRedirectReq: EventEmitter<string> = new EventEmitter();
  @Output() openGenericPopup: EventEmitter<any> = new EventEmitter();
  @Output() deviceInfoUpdated: EventEmitter<any> = new EventEmitter();
  @Output() setViewReq: EventEmitter<any> = new EventEmitter();
  @Output() setTrayReq: EventEmitter<any> = new EventEmitter();
  @Output() newPerspectiveSelectedNoti: EventEmitter<any> = new EventEmitter();
  @Output() closeNavbar: EventEmitter<any> = new EventEmitter();
  @Output() logoutUserReq: EventEmitter<any> = new EventEmitter();
  /** Event emitter that can be monitored to be notified when the user has been logged in successfully */
  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
  /** Event emitter that can be monitored to be notified when the user has been logged out successfully */
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter();
  @Output() showAlertReq: EventEmitter<any> = new EventEmitter();
  @Output() showDialogReq: EventEmitter<any> = new EventEmitter();
  @Output() closeDialogReq: EventEmitter<any> = new EventEmitter();

  @Output() closeOverlayReq: EventEmitter<any> = new EventEmitter();
  @Output() updateSchedulesReq: EventEmitter<any> = new EventEmitter();
  @Output() updateMessagesReq: EventEmitter<any> = new EventEmitter();
  @Output() updateEventsReq: EventEmitter<any> = new EventEmitter();
  @Output() updateStatesReq: EventEmitter<any> = new EventEmitter();
}
