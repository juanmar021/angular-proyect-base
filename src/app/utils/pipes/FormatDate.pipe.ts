import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
 
  transform(value: string , type: string='complete'): string {
     
    const event = new Date(value);
    let  options;
    if(type === 'complete')
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
    else
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return event.toLocaleDateString('es-ES', options);
  }
 
}