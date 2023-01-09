import {
  INLINE_OPTIONS,
  QUERY_PARAMS,
  SORT_OPTIONS,
} from '../common/helpers/constants';
import { getQueryParamSubcategories } from '../common/helpers/getQueryParamSubcategories';
import { Data } from '../common/types/data';

export function applyQueries(queries: string, data: Data[]): Data[] {
  let newData = data.filter((elem) => {
    return isElemInQuery(queries, elem);
  });

  newData = sortArr(queries, newData);

  return newData;
}

export function isInline(query: string): boolean {
  const inline = String(getQueryParamSubcategories(query, QUERY_PARAMS.inline));

  return inline === INLINE_OPTIONS.true ? true : false;
}

function isElemInQuery(query: string, element: Data): boolean {
  const category = doesElemContainQueryCategoryBrand(
    query,
    QUERY_PARAMS.category,
    element,
  );
  const brand = doesElemContainQueryCategoryBrand(
    query,
    QUERY_PARAMS.brand,
    element,
  );
  const price = doesElemContainQueryPriceStock(
    query,
    QUERY_PARAMS.price,
    element,
  );
  const stock = doesElemContainQueryPriceStock(
    query,
    QUERY_PARAMS.stock,
    element,
  );
  const search = doesElemContainQuerySearch(
    query,
    QUERY_PARAMS.search,
    element,
  );

  return category && brand && price && stock && search;
}

function sortArr(query: string, arrayToSort: Data[]): Data[] {
  let sortedArr: Data[] = arrayToSort;
  const sortString = String(
    getQueryParamSubcategories(query, QUERY_PARAMS.sort),
  ); //возвращает массив строк или []

  switch (sortString) {
    case SORT_OPTIONS.priceASC:
      sortedArr = arrayToSort.sort((a: Data, b: Data) => a.price - b.price);
      break;

    case SORT_OPTIONS.priceDESC:
      sortedArr = arrayToSort.sort((a: Data, b: Data) => b.price - a.price);
      break;

    case SORT_OPTIONS.ratingASC:
      sortedArr = arrayToSort.sort((a: Data, b: Data) => a.rating - b.rating);
      break;

    case SORT_OPTIONS.ratingDESC:
      sortedArr = arrayToSort.sort((a: Data, b: Data) => b.rating - a.rating);
      break;
  }

  return sortedArr;
}

//для текстовых параметров category, brand
function doesElemContainQueryCategoryBrand(
  query: string,
  param: string,
  element: Data,
): boolean {
  // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  const subcategories = getQueryParamSubcategories(query, param);
  const elementParam = element[param as keyof Data];

  if (subcategories.length === 0) {
    return true;
  }

  return subcategories.includes(
    encodeURIComponent(String(elementParam)).toLowerCase(),
  )
    ? true
    : false;
}

//для числовых параметров price, stock
function doesElemContainQueryPriceStock(
  query: string,
  param: string,
  element: Data,
): boolean {
  // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  const range = getQueryParamSubcategories(query, param);
  const min = Number(range[0]);
  const max = Number(range[1]);
  const elemValue = element[param as keyof Data];

  if (range.length === 0) {
    return true;
  }

  return elemValue >= min && elemValue <= max ? true : false;
}

//для поиска search
function doesElemContainQuerySearch(
  query: string,
  param: string,
  element: Data,
): boolean {
  const searchArr = getQueryParamSubcategories(query, param);
  const searchString = decodeURIComponent(String(searchArr)).toLowerCase();

  if (searchArr.length === 0) {
    return true;
  }

  // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  if (
    element.brand.toLowerCase().includes(searchString) ||
    element.category.toLowerCase().includes(searchString) ||
    element.description.toLowerCase().includes(searchString) ||
    String(element.discountPercentage).includes(searchString) ||
    String(element.price).includes(searchString) ||
    String(element.rating).includes(searchString) ||
    String(element.stock).includes(searchString) ||
    element.title.toLowerCase().includes(searchString)
  ) {
    return true;
  }

  return false;
}
