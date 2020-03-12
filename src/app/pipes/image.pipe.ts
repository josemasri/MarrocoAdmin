import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(id: string): string {
    return `${environment.URL_SERVICES}/product/img/${id}`;
  }

}
