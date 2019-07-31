import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'formatDate'})
export class FormatDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'dd-MM-yyyy');
  }
}
