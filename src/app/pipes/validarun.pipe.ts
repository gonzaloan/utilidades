import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validarun'
})
export class ValidarunPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return "hola";
  }

}
