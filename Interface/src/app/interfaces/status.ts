export class Status {
    id: string;
    deviceID: string;
    createTime: number;
    data: any;
    state: string;

    constructor(id: string, deviceID: string, createTime: number, data: any, state: string) {
        this.id = id;
        this.deviceID = deviceID;
        this.createTime = createTime;
        this.data = data;
        this.state = state;
    }
}

