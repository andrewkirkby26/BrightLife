import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Constants } from "../constants/constants";
import { Device } from "../interfaces/devices/device";
import { Feeder } from "../interfaces/devices/feeders";
import { LaserTainer } from "../interfaces/devices/laserTainer";

@Injectable({
    providedIn: 'root',
  })
export class Utils {

    init() {

    }

    static splitStringWithMultiDelimeter = function(str: any, tokens: any[]): string[]{
        let rVal: string[] = [];
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        rVal = str.split(tempChar);
        return rVal;
	}

    static copyToClipboard(val: string) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = val;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    static setLocalStorageVariable(name: string, value: any) {
        localStorage.setItem(Constants.UI_STORAGE_VARIABLE_PREFIX + '-' + environment.name + '-' + environment.realm + '-' + name, value);
    }

    static getLocalStorageVariable(name: string): string | null {
        let rVal: string | null = null;

        let check  = localStorage.getItem(Constants.UI_STORAGE_VARIABLE_PREFIX + '-' + environment.name + '-' + environment.realm+ '-' + name);
        if (check) {
            rVal = check;
        }

        return rVal;
    }

    static removeLocalStorageVariable(name: string): string | null {
        let rVal: string | null = null;

        let check  = localStorage.getItem(Constants.UI_STORAGE_VARIABLE_PREFIX + '-' + environment.name + '-' + environment.realm+ '-' + name);
        if (check) {
            localStorage.removeItem(Constants.UI_STORAGE_VARIABLE_PREFIX + '-' + environment.name + '-' + environment.realm+ '-' + name);
            rVal = check;
        }

        return rVal;
    }

    static dateFormatter(date: Date, formatString: string) : string{
        date = new Date(date);
        var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
        YY = ((YYYY=date.getFullYear())+"").slice(-2);
        MM = (M=date.getMonth()+1)<10?('0'+M):M;
        MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
        DD = (D=date.getDate())<10?('0'+D):D;
        DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()]).substring(0,3);
        th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
        formatString = formatString.replace("#YYYY#",YYYY.toString()).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM.toString()).replace("#M#",M.toString()).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD.toString()).replace("#D#",D.toString()).replace("#th#",th);
        h=(hhh=date.getHours());
        if (h==0) h=24;
        if (h>12) h-=12;
        hh = h<10?('0'+h):h;
        hhhh = hhh<10?('0'+hhh):hhh;
        AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
        mm=(m=date.getMinutes())<10?('0'+m):m;
        ss=(s=date.getSeconds())<10?('0'+s):s;
        return formatString.replace("#hhhh#",hhhh.toString()).replace("#hhh#",hhh.toString()).replace("#hh#",hh.toString()).replace("#h#",h.toString()).replace("#mm#",mm.toString()).replace("#m#",m.toString()).replace("#ss#",ss.toString()).replace("#s#",s.toString()).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
    }

    static findSingleItemInArrayByKeyAndValue(array: any[], key: string, value: any): any {
        let rVal = null;
        try {
            array.forEach(function(item) {
                if (item[key] == value) {
                    rVal = item;
                }
            })
        } catch (e) {

        }
        return rVal;
    }

    static filterArrayByKeyAndValue(array: any[], key: string, value: any): any[] {
        if (array) {
            return array.filter(e => e[key] == value);
        }
        return [];
    }

    static checkIfTwoJsonObjectsAreIdentical(obj1: any, obj2: any): boolean {
        let rVal=true;

        if(Object.keys(obj1).length==Object.keys(obj2).length){
            Object.keys(obj1).forEach(function(key) {
                if(obj1[key] != obj2[key]) {
                    rVal=false;
                }
            })
        } else {
            rVal = false;
        }

        return rVal;
    }

    static arraysMatch(array1: any[], array2: any[], orderMatters: false) {
        let rVal = true;

        if (array1.length != array2.length) {
            rVal = false;
        } else {
            array1.forEach((ent1, index) => {
                if (orderMatters) {
                    if (ent1 != array2[index]) {
                        rVal = false;
                    }
                } else {
                    let found = false;
                    array1.forEach((ent2) => {
                        if (ent1 == ent2) {
                            found = true;
                        }
                    })
                    if (!found) {
                        rVal = false;
                    }
                }
            })
        }

        return rVal;
    }

    static getExecuteNiceTextForDevice(device: Device): string {
        let rVal = 'Execute';

        let type = device.type;

        if (type == Constants.DEVICE_TYPE_FEEDER) {
            rVal = 'Feed';
        } else if (type == Constants.DEVICE_TYPE_LASER_TAINER){
            rVal = 'Play';
        }

        return rVal;
    }

    static getBooleanValue(val: any): boolean {
        let rVal = false;
    
        if (val == true || val == false) {
          rVal = val;
        } else {
          if (val.toLowerCase() == 'true') {
            rVal = true;
          }
        }
    
        return rVal;
    }

    static parseValueToCorrectType(value: any): any {
        let rVal: any = value;

        try {
            if (value.toLowerCase() == 'true') {
                rVal = true;
            } else if (value.toLowerCase() == 'false') {
                rVal = false;
            }
        } catch (e) {

        }

        return rVal;
    }

    static findIndexOfItemInArrayByKeyAndValue(array: any[], key: string, value: any): number {
        let rVal = -1;
        try {
            for (let i = 0; i < array.length; i++) {
                let item = array[i];
                if (item[key] == value) {
                    rVal = i;
                    break;
                }
            }
        } catch (e) {

        }
        return rVal;
    }

    static removeSingleItemFromArrayByKeyAndValue(array: any[], key: string, value: any): any[] {
        let rVal: any[] = [];
        try {
            array.forEach(function(item) {
                if (item[key] != value) {
                    rVal.push(item);
                }
            })
        } catch (e) {

        }
        return rVal;
    }

    static getInputValueById(id: string) {
        let rVal: any | null = null;

        try {
            rVal = $('#' + id).val();
        } catch (e) {

        }

        return rVal;
    }

    static checkIfArraysMatch(array1: any[], array2: any[], orderMatter: boolean): boolean  {
        let rVal = false;

        if (array1 && array2) {
            if (array1.length == array2.length) {
                rVal = true;
                for (let i = 0; i < array1.length; i++) {
                    let obj1 = array1[i];
                    let obj2: any | null = null;
                    if (orderMatter) {
                        obj2 = array2[i];
                    } else {
                        for (let k = 0; k < array2.length; k++) {
                            let check = array2[k];
                            if (check == obj1) {
                                obj2 = check;
                                break;
                            }
                        }
                    }
                    if (!obj2 || obj2 != obj1) {
                        rVal = false;
                        break;
                    }
                }
            }
        }

        return rVal;
    }


    static getScreenSize() {
		let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		
		if (screenHeight/screenWidth > 1) {
			return Constants.SCREEN_SIZE_SMALL;
        } else if (screenWidth < 1100) {
			return Constants.SCREEN_SIZE_MEDIUM;
		} else {
			return Constants.SCREEN_SIZE_LARGE;
		}
	}	

    static sortByProperty(property: string){  
        return function(a: any,b: any){  
            if(a[property] > b[property])  
                return 1;  
            else if(a[property] < b[property])  
                return -1;  
        
            return 0;  
        }  
    }

    static getKeyValue = function<T extends object, U extends keyof T> (obj: T, key: U) { return obj[key] }

    static createId = function(length: number): string {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static getAllQueryParameters(): any {
        let url = location.href;
		var question = url.indexOf("?");
		var hash = url.indexOf("#");
		if(hash==-1 && question==-1) return {};
		if(hash==-1) hash = url.length;
		var query = question==-1 || hash==question+1 ? url.substring(hash) : 
		url.substring(question+1,hash);
		var result: any = {};

        //Now check the current URL (this way current URL overwrites model)
		query.split("&").forEach(function(part) {
			if(!part) return;
			part = part.split("+").join(" "); // replace every + with space, regexp-free version
			var eq = part.indexOf("=");
			var key = eq>-1 ? part.substr(0,eq) : part;
			var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
			var from = key.indexOf("[");
			if(from==-1) (result as any)[decodeURIComponent(key)] = val;
			else {
			var to = key.indexOf("]",from);
			var index = decodeURIComponent(key.substring(from+1,to));
			key = decodeURIComponent(key.substring(0,from));
			if(!result[key]) result[key] = [];
			if(!index) result[key].push(val);
			else result[key][index] = val;
			}
		});

        
		return result;
    }

    static createDomId = function(length: number): string {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static addMinutes = function(date: Date, minutes:number): Date {
        return new Date(date.getTime() + minutes*60000);
    }

    static getCookie = function(name: string): string | null{
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        else{
             return null;
        }
    }

    static countPairsOnJson = function (obj: any): number {
        var count=0;
        for(var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ++count;
            }
        }
        return count;
    }

    static replaceItemInArrayByKeyAndValueOtherwiseAdd = function (array: any[], item: any, key: string, value: any) {
		let rVal = array;
		let found = false;
		try {
			for (let i = 0; i < array.length; i++) {
				if (array[i][key] == value) {
					rVal[i] = item;
					found = true;
					break;
				}
			}
		} catch (e) {

		}
		if (!found) {
			rVal.push(item);
		}

		return rVal;
	}

    static replaceAll(ogString: string, old: string, replacer: string) {
		while(ogString.indexOf(old) != -1) {
			ogString = ogString.replace(old, replacer);
		}
	
		return ogString;
	}

    static parseDevice(d: any) {
        if (d) {
            switch(d.type) {
                case Constants.DEVICE_TYPE_FEEDER: {
                    return new Feeder(d);
                }
                case Constants.DEVICE_TYPE_LASER_TAINER: {
                    return new LaserTainer(d);
                }
            }
        }
        return new Device(d);
    }
}

