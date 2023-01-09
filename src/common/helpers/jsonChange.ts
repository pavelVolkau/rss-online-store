export function toJSON<T>(data: T): string {
  return JSON.stringify(data);
}
export function toData<T>(json: string): T {
  return JSON.parse(json);
}
