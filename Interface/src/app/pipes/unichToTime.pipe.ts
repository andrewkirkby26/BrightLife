import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from '../utils/utils';

@Pipe({name: 'unichToTime'})
export class UnichToTimePipe implements PipeTransform {
  transform(input: any): string {
    if (!input) {
      return '-';
    }
    var date: Date;
    if (input instanceof Date) {
      date = input;
    } else {
      date = new Date(input);
    }
    return Utils.dateFormatter(date, '#h#:#mm# #AMPM#')
  }
}