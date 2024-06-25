import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuiteFormat',
  standalone: true,
})
export class MinutePipe implements PipeTransform {
  transform(seconds: number | null): string {
    const num = Math.floor((seconds ?? 0) / 60);
    return num > 9 ? `${num}` : `0${num}`;
  }
}
