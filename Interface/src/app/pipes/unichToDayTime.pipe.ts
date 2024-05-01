import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from '../utils/utils';

@Pipe({name: 'unichToDayTime'})
export class UnichToDayTimePipe implements PipeTransform {
  transform(input: any): string {
    if (input == null) {
      return '-';
    }
    var date: Date;
    if (input instanceof Date) {
      date = input;
    } else {
      date = new Date(input);
    }
    return Utils.dateFormatter(date, "#M#/#D# #h#:#mm# #AMPM#");
  }   
}