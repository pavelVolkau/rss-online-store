import { Data } from '../../types/data';

export function toJSON(data: Data[]): string {
  return JSON.stringify(data);
}
export function toData(json: string | null): Data[] | void {
  if (json) return JSON.parse(json);
}
