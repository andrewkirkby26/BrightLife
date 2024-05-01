import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'checkForEmpty'})
export class CheckForEmptyPipe implements PipeTransform {
  transform(text: any): string {
    if (text && text != '') {
      return text;
    } else {
      return '-';
    }
  }
}