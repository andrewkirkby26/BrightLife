import { Pipe, PipeTransform } from '@angular/core';
/*
Trims the supplied string to 
a desired length with ... if it is too long
*/
@Pipe({name: 'trim'})
export class TrimPipe implements PipeTransform {
  transform(input: string, length: number): string {
    if (input == undefined) {
        return '';
    }
    if (length) {
      if (input.length > length - 3) {
        return input.substr(0, length - 3) + "...";
      }
    }
    
    return input;
  }
}