import { SEPARATORS } from './constants';

export function getQueryParamSubcategories(
  query: string | undefined,
  param: string,
): string[] {
  let subcategoriesArr: string[] = [];
  if (query) {
    const queryArr = query.split(SEPARATORS.queryParams);

    queryArr.forEach((el) => {
      const arrayOfParamAndSubcategories = el.split(
        SEPARATORS.paramsAndSubcategories,
      );
      const queryParam = arrayOfParamAndSubcategories[0];

      if (queryParam === param) {
        const subcategoriesStr = arrayOfParamAndSubcategories[1];

        subcategoriesArr = subcategoriesStr.split(SEPARATORS.subcategory);
      }
    });
  }

  return subcategoriesArr;
}
