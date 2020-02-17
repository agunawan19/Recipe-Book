import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  constructor() { }

  isNullOrWhitespace = (input: string): boolean =>
    !input || !input.trim();
}
