export function createUniqueArr(arr: string[]): string[] {
  const result: string[] = [];

  for (const str of arr) {
    if (!includesCaseInsensitive(result, str)) {
      result.push(str);
    }
  }

  return result;
}

function includesCaseInsensitive(arr: string[], str: string): boolean {
  let result = false;

  arr.forEach((el) => {
    if (el.toLowerCase() === str.toLowerCase()) {
      result = true;
    }
  });

  return result;
}
