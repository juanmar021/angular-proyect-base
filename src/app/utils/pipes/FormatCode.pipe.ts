import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'formatCode'
})
export class FormatCodePipe implements PipeTransform {
 
  transform(value: number,char:string,length: number=5): string {
     
      let code= String(value).padStart(length,'0');  
      return char+code;
  }
 
}