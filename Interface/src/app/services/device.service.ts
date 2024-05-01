import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { NavigationService } from './navigation.service';
import { Constants } from '../constants/constants';
import { Observable, of } from 'rxjs';
import { Button } from 'src/app/interfaces/button';
import { domainToASCII } from 'url';
import { User } from 'src/app/interfaces/user';
import { catchError } from 'rxjs/internal/operators/catchError';
import {Utils} from '../utils/utils';
import { EventService } from './event.service';
import { getAuth, signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { FirebaseService } from '../firebase/firebase.service';
import { FirestoreService } from '../firebase/firestore.service';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { Device } from '../interfaces/devices/device';
import { GroupService } from './group.service';
import { FunctionsService } from '../firebase/functions.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService{

  devices: Device[] = [];
  selectedDevice: Device | null = null;
  deviceForChanges: Device | null = null;
  groupedDevices: any[] = [];
  stateSubscriptions: any;

  constructor(public http: HttpClient, public eventService: EventService, public authenticationService: AuthenticationService, public firebaseService: FirebaseService, 
    public firestoreService: FirestoreService, public groupService: GroupService, public functionsService: FunctionsService) { 
    this.eventService.userLoggedIn.subscribe(resp => {
      this.updateDevices();
    })

    this.eventService.userLoggedOut.subscribe(resp => {
      this.unselectDevice();
      this.devices = [];
    })
  } 

  updateDevices() {
    try {
      this.clearStateSubscribers();
      this.firestoreService.queryForDocuments(Constants.COLLECTION_DEVICES, where('ownerID', '==', this.authenticationService.user!.uid)).then( initDeviceList => {
        let listOfDeviceIds: string[] = [];
        let realDevices: Device[] = [];
        initDeviceList.forEach((device) => {
          listOfDeviceIds.push(device.serialNo);
          realDevices.push(Utils.parseDevice(device));
        })
        this.devices = realDevices;
        console.log('Devices: ', this.devices)

        if (this.selectedDevice != null) {
          this.selectDevice(Utils.findSingleItemInArrayByKeyAndValue(this.devices, 'serialNo', this.selectedDevice.serialNo));
        }

        let listOfAllDevices: any[] = realDevices;
        let grouped: any[] = [];
        this.groupService.groups.forEach((realGroup) => {
          let group = (realGroup as any);
          group.devices = [];
          realGroup.deviceIDs.forEach((deviceID) => {
            group.devices.push(this.getDeviceById(deviceID));
            listOfAllDevices = Utils.removeSingleItemFromArrayByKeyAndValue(listOfAllDevices, 'serialNo', deviceID);
          })

          grouped.push(group);
        })

        if (listOfAllDevices.length > 0) {
          let group: any = {
            ownerID: this.authenticationService.user!.uid,
            name: 'Unassigned',
            devices: [],
            deviceIDs: [],
            icon: 'filter_list'
          }

          listOfAllDevices.forEach((dev) => {
            group.deviceIDs.push(dev.serialNo);
            group.devices.push(dev);
          })

          grouped.push(group);
        }

        this.groupedDevices = grouped;

        let coll_ref = collection(this.firestoreService.db, Constants.COLLECTION_STATUS);
        let q = query(coll_ref, where("deviceID", "in", listOfDeviceIds));

        this.stateSubscriptions = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let id = doc.id;
            this.devices.forEach((device) => {
              if (device.serialNo == id) {
                device.state =  doc.data();
              }
            })  
          });
        });
      })
    } catch (e) {

    }
  }

  getDeviceById(id: string): Device | null {
    let device = Utils.findSingleItemInArrayByKeyAndValue(this.devices, 'serialNo', id)
    return device ? Utils.parseDevice(device) : null;
  }

  clearStateSubscribers() {
    if (this.stateSubscriptions) {
      this.stateSubscriptions();
    }
  }

  selectDevice(device: Device | null) {
    this.selectedDevice = Utils.parseDevice(device);
    // console.log(this.selectedDevice)
    this.deviceForChanges = device ? Utils.parseDevice(device) : null;
  }

  setDevice(device: Device) {
    // if (schedule._id == '') {
    //   schedule._id =  Utils.createDomId(25);
    // }
    device.ownerID = this.authenticationService.user!.uid;
    delete device.state;
    this.firestoreService.setDocument(Constants.COLLECTION_DEVICES, device.serialNo, (device as any));
    this.askDeviceToPullConfig(device.serialNo);
    setTimeout(() => {
      this.updateDevices();
    },250);
  }

  canSaveDevice() {
    let rVal = false;
    if (this.selectedDevice && this.deviceForChanges) {
        if (!this.deviceForChanges.isEqual(this.selectedDevice)) {
          rVal = true;
        }
    } 

    return rVal;
  }

  unselectDevice() {
    this.selectedDevice = null;
    this.deviceForChanges = null;
  }

  // sendRequestForDevice(command: any, id: string) {
  //   this.functionsService.callFunction('postMessage', {message: command, topic: id})

  //   let device = this.getDeviceById(id);
  //   this.eventService.showAlertReq.emit({message: 'Successfully sent request to ' + device.name + '!'});
  // }

  askDeviceToPullConfig(id: string) {
    this.sendRequestForDevice({command: 'updateConfig'}, id, false);
  }

  sendRequestForDevice(command: any, id: string, showAlert: boolean = true) {
    this.firestoreService.setDocument(Constants.COLLECTION_COMMANDS, id, {'command': command});

    if (showAlert) {
      let device = this.getDeviceById(id);
      if (device) {
        this.eventService.showAlertReq.emit({message: 'Successfully sent request to ' + device.name + '!'});
      }
    }
  }
}
