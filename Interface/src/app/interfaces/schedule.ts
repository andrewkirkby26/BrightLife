import { Constants } from "../constants/constants";
import { Utils } from "../utils/utils";

export class Schedule {
    _id: string = '';
    command: string = 'execute';
    days: string[] = [];
    deviceID: string = '';
    enabled: boolean = true;
    valueParam: any | null= null;
    ownerID: string = '';
    time: string = '12:00';
    type: string = 'exact';
    name: string = '';
    
    constructor(c: Schedule | null) {
        if (c) {
            this._id = c._id;
            this.command = c.command;
            this.days = [];
            if (c.days) {
                Constants.DAYS.forEach((day) => {
                    if (c.days.includes(day)) {
                        this.days.push(day);
                    }
                })
            }
            this.deviceID = c.deviceID;
            this.enabled = c.enabled;
            this.valueParam = c.valueParam;
            this.ownerID = c.ownerID;
            this.time = c.time;
            this.type = c.type;
            this.name = c.name;
        }
    }

    getNiceDaysOfWeek(): string {
        let rVal = '';

        if (this.days) {
            if (this.days.length == 7) {
                rVal = 'Mon-Sun';
            } else {
                this.days.forEach(((day, index) => {
                    let prefix = ', ';
                    if (index == 0) {
                        prefix = '';
                    }
                    rVal += prefix + day.slice(0, 3);
                }))
            }
        }

        return rVal;
    }

    getNiceTimes(): string {
        let rVal = '';
        if (this.time) {
            let hour = parseInt(this.time.split(':')[0]);
            let min = this.time.split(':')[1];
            let ampm = hour < 12 ? 'AM' : 'PM';
            hour = hour > 12 ? hour - 12 : hour;
            rVal +=  hour + ':' + min + ' ' + ampm;
        }
        

        return rVal;
    }
}

