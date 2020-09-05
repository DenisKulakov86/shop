import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
  transform(obj: { key; value }): number {
    return Object.entries(obj).reduce((sum, [, v]) => (sum += v), 0);
  }
}
