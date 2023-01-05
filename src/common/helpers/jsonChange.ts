import { localStorageData } from '../types/localStorageData';

export function toJSON(data: localStorageData[]): string {
  return JSON.stringify(data);
}
export function toData(json: string | null): localStorageData[] | void {
  if (json) return JSON.parse(json);
}
