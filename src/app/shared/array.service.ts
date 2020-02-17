import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  sumByKey = (items: any, keyName: string, valueName: string) => items.reduce(
    (result: any[], item: any) => {

      if (!result.some(e => e[keyName].toLowerCase() === item[keyName].toLowerCase())) {
        result.push(item);
      } else {
        result.find(e => e[keyName].toLowerCase() === item[keyName].toLowerCase())[valueName] += item[valueName];
      }

      return result;
    }, []
  )

}
