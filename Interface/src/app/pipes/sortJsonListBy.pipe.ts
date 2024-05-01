import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../utils/utils';

@Pipe({name: 'sortJsonListBy'})
export class SortJsonListByPipe implements PipeTransform {
    transform(array: any[], sort: string): any[] {
        return array.sort(Utils.sortByProperty(sort));
    }
}