export function createUniqueArr(arr: string[]): string[] {
  const result: string[] = [];

  for (const str of arr) {
    if (
      !result.includes(`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`)
    ) {
      result.push(str);
    }
  }

  return result;
}
