import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  sumByKey = (items: any, keyName: string, valueName: string) => items.reduce(
    (result: any[], item: any) => {

      const lowerCasedItemKeyName = item[keyName].toLowerCase();

      if (!result.some(e => e[keyName].toLowerCase() === lowerCasedItemKeyName)) {
        result.push(item);
      } else {
        result.find(e => e[keyName].toLowerCase() === lowerCasedItemKeyName)[valueName] += item[valueName];
      }

      return result;
    }, []
  )

}
