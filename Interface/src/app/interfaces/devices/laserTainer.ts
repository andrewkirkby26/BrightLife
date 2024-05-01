import { Constants } from "../../constants/constants";
import { Schedule } from "../schedule";
import { Status } from "../status";
import { Device } from "./device";

export class LaserTainer extends Device {

    constructor(c: LaserTainer) {
        super(c);
        if (c) {
            
        }
    }

    override isEqual(q: LaserTainer | null): boolean {
        let rVal = super.isEqual(q);
        if (q) {
            if (this.data.pitchMin != q.data.pitchMin || 
                this.data.pitchMax != q.data.pitchMax) {
                rVal = false;
            }
        }
        return rVal;
    }
}

