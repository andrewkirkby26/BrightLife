import { Pipe, PipeTransform } from '@angular/core';
/*
Trims the supplied string to 
a desired length with ... if it is too long
*/
@Pipe({name: 'commasToNumber'})
export class CommasToNumberPipe implements PipeTransform {
  transform(val: string): string {
    try {
      let iVal = parseInt(val);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
      return val;
    }
  }
}