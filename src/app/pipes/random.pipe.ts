import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'random' })
export class RandomPipe implements PipeTransform {
  transform(arr: any[], limit: number): any {
    let tmp = [...arr];
    return new Array(limit > arr.length ? arr.length : limit)
      .fill(null)
      .map(() => {
        let item = tmp.splice(Math.floor(Math.random() * tmp.length), 1);
        return item[0];
      });
  }
}
