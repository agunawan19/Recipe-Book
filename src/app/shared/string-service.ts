import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  isNullOrWhitespace(input: string): boolean {
    return !input || !input.trim();
  }
}
