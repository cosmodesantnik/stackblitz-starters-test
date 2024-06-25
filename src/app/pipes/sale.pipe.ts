import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saleFormat',
  standalone: true,
})
export class SalePipe implements PipeTransform {
  transform(price: number, sale: number): number {
    return Math.ceil(price * (sale / 100 + 1));
  }
}
