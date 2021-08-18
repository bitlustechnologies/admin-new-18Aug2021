import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentcount'
})
export class ExponentcountPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // value = parseFloat(value) 

    value = this.convertExponentialToDecimal(value)
    // console.log("exp");
    // console.log(value);
    // check here if initial value is less than 1

    if( value <= 0)
      {
        value = '0.0'
      }
      else
      {
        let firstBlncTest =  String(value).split(".", 2);
        if(firstBlncTest.length > 1) {
          if(firstBlncTest[1].length > args)
          {
            let presc3 = firstBlncTest[1].substring(0,args)

            value = firstBlncTest[0]+'.'+presc3

            if(value <= 0)
            value = '0.0'
          }
       }
     }


     return value

  }


  convertExponentialToDecimal(exponentialNumber) {
    const str = exponentialNumber.toString();
    if (str.indexOf('e') !== -1) {
    const exponent = parseInt(str.split('-')[1], 18); 
    const result = exponentialNumber.toFixed(20);
    return result;
    } else {
    return exponentialNumber;
    }
  }

}

