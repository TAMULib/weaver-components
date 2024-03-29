import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default',
  pure: true
})
export class DefaultPipe implements PipeTransform {

  transform(value: string, defaultValue: string): string {
    return value ? value : defaultValue;
  }

}
