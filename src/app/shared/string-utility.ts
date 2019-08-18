export class StringUtility {
  public static isNullOrWhitespace(input: string): boolean {
    return !input || !input.trim();
  }
}
