export class StringService {
  isNullOrWhitespace(input: string): boolean {
    return !input || !input.trim();
  }
}
