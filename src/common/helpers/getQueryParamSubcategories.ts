import { SEPARATORS } from './constants';

export function getQueryParamSubcategories(
  query: string,
  param: string,
): string[] {
  let subcategoriesArr: string[] | undefined = [];
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

  return subcategoriesArr;
}
