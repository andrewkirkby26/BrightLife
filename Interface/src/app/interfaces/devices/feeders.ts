import { Constants } from "../../constants/constants";
import { Schedule } from "../schedule";
import { Status } from "../status";
import { Device } from "./device";

export class Feeder extends Device {

    constructor(c: Feeder) {
        super(c);
        if (c) {

        }
    }

    override isEqual(q: Feeder | null): boolean {
        let rVal = super.isEqual(q);
        if (q) {
            
        }

        return rVal;
    }
}

