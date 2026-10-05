export function safeParseJson(json: string): any {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
    return null;
  }
}
