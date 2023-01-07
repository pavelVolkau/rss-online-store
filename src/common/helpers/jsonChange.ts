import { localStorageData } from '../types/localStorageData';

export function toJSON(data: localStorageData[]): string {
  return JSON.stringify(data);
}
export function toData(json: string): localStorageData[] {
  if (json) return JSON.parse(json);
  return [];
}
