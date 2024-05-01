import { Schedule } from "./schedule";

export class Message {
    
    deviceID: string;
    level: string;
    _id: string;
    message: string;
    ownerID: string;
    title: string;
    createTime: number;

    constructor(id: string, deviceID: string, level: string, message: string, ownerID: string, title: string, createTime: number) {
        this._id = id;
        this.deviceID = deviceID;
        this.level = level;
        this.message = message;
        this.ownerID = ownerID;
        this.title = title;
        this.createTime = createTime;
    }

}

