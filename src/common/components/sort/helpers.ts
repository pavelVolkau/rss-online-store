import { QUERY_PARAMS, ROUTES, SEPARATORS } from '../../helpers/constants';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';

export function addQueryToMain(param: string, subcategory: string): string {
  const locationSearch = window.location.search;
  if (!locationSearch) {
    return (
      ROUTES.main +
      SEPARATORS.searchQuery +
      param +
      SEPARATORS.paramsAndSubcategories +
      subcategory
    );
  }
  const query = locationSearch.split(SEPARATORS.searchQuery)[1];

  const category = getQueryParamSubcategories(query, QUERY_PARAMS.category);
  const brand = getQueryParamSubcategories(query, QUERY_PARAMS.brand);
  const price = getQueryParamSubcategories(query, QUERY_PARAMS.price);
  const stock = getQueryParamSubcategories(query, QUERY_PARAMS.stock);
  const sort = getQueryParamSubcategories(query, QUERY_PARAMS.sort);
  const search = getQueryParamSubcategories(query, QUERY_PARAMS.search);
  const inline = getQueryParamSubcategories(query, QUERY_PARAMS.inline);

  const paramsArr = [
    QUERY_PARAMS.category,
    QUERY_PARAMS.brand,
    QUERY_PARAMS.price,
    QUERY_PARAMS.stock,
    QUERY_PARAMS.sort,
    QUERY_PARAMS.search,
    QUERY_PARAMS.inline,
  ];

  const ParamAndSubcatArr = [
    category,
    brand,
    price,
    stock,
    sort,
    search,
    inline,
  ].map((val, ind) => {
    if (paramsArr[ind] === param) {
      if (val.includes(subcategory)) {
        return;
      }
      val.push(subcategory);
    }

    if (val.length === 0) {
      return;
    }

    return (
      paramsArr[ind] +
      SEPARATORS.paramsAndSubcategories +
      val.join(SEPARATORS.subcategory)
    );
  });

  return (
    ROUTES.main +
    SEPARATORS.searchQuery +
    ParamAndSubcatArr.join(SEPARATORS.queryParams)
  );
}
