import { Utils } from "src/app/utils/utils";

export class Tab {
    display: string | number;
    value: any;
    minAccessLevel: string | null = null;
    disabled: boolean = false;
    list: any[] = [];

    constructor(display: string | number, value: any, minAccessLevel: string | null, disabled: boolean | null, list: any[] | null) {
        this.display = display;
        this.value = value;
        if (minAccessLevel) {
            this.minAccessLevel = minAccessLevel;
        }   
        if (disabled) {
            this.disabled = disabled;
        }
        if (list) {
            this.list = list;
        }
    }
}