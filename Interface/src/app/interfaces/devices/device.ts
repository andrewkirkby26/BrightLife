import { Constants } from "../../constants/constants";
import { Schedule } from "../schedule";
import { Status } from "../status";

export class Device {
    name: string = '';
    type: string = '';
    serialNo: string = '';
    data: any = {};
    ownerID: string = '';
    state: any | null = null;

    constructor(c: Device) {
        if (c) {
            this.name = c.name;
            this.ownerID = c.ownerID;
            this.type = c.type;
            this.serialNo = c.serialNo;
            this.state = c.state;
            this.data = JSON.parse(JSON.stringify(c.data));
        }
    }

    isOffline() {
        let rVal = true;

        if (this.state) {
            let stateTime = this.state.createTime;
            let now = new Date().getTime();
            let diff = now - stateTime;
            
            if (diff < 120000) {
                rVal = false;
            }
        }

        return rVal;
    }

    isExecuting() {
        let rVal = false;

        if (this.state) {
            rVal = this.state.state == Constants.STATE_EXECUTING;
        }

        return rVal;
    }

    isEqual(q: Device | null): boolean {
        let rVal = true;
        if (q) {
            if (this.name != q.name) {
                rVal = false;
            }
        } else {
            rVal = false;
        }

        return rVal;
    }

    isFeeder() {
        return this.type == Constants.DEVICE_TYPE_FEEDER
    }

    isLaserTainer() {
        return this.type == Constants.DEVICE_TYPE_LASER_TAINER
    }
}

