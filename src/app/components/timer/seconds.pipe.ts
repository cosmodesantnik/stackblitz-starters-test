import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondFormat',
  standalone: true,
})
export class SecondsPipe implements PipeTransform {
  transform(seconds: number | null): string {
    const num = Math.ceil((seconds ?? 0) % 60);
    return num > 9 ? `${num}` : `0${num}`;
  }
}
