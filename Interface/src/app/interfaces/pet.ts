export class Pet {
    name: string;
    _id: string;
    type: string;
    deviceIDs: string[];
    ownerID: string;

    constructor(name: string, id: string, type: string, ownerID: string, deviceIDs: string[]) {
        this.name = name;
        this._id = id;
        this.type = type;
        this.ownerID = ownerID;
        this.deviceIDs = deviceIDs;
    }
}

