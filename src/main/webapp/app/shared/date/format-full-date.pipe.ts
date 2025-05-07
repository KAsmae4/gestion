import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs/esm';

@Pipe({
  name: 'formatFullDate',
})
export class FormatFullDatePipe implements PipeTransform {
  transform(day: dayjs.Dayjs | null | undefined): string {
    return day ? day.format('DD MMMM YYYY') : '';
  }
}
