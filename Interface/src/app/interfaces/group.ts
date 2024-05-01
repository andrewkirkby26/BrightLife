import { Schedule } from "./schedule";

export class Group {
    name: string;
    _id: string;
    ownerID: string;
    deviceIDs: string[];
    icon: string;

    constructor(name: string, id: string,ownerID: string, deviceIDs: string[], icon: string) {
        this.name = name;
        this._id = id;
        this.ownerID = ownerID;
        this.deviceIDs = deviceIDs;
        this.icon = icon;
    }
}

