import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from '../utils/utils';

@Pipe({name: 'secondsToHourMinSeconds'})
export class SecondsToHourMinSecondsPipe implements PipeTransform {
  transform(input: number): string {
    let rVal ='-'
    if (!input) {
      return rVal;
    }
    let hours = Math.floor(input / (60 * 60));
    input = input - (hours * 60 * 60);
    let minutes =  Math.floor(input / 60);
    input = input - (minutes * 60);
    let seconds = input;

    rVal = '';
    if (hours > 0) {
      rVal += hours + ' hours, ';
    }
    if (minutes > 0) {
      rVal += minutes + ' minutes, ';
    }
    rVal += seconds + ' seconds';

    return rVal;
  }
}