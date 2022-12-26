import { Data } from '../common/types/data';

const QueryParams = {
  category: 'category',
  brand: 'brand',
  price: 'price',
  stock: 'stock',
  sort: 'sort',
  search: 'search',
  inline: 'inline',
};

export function createLink(location: HTMLLinkElement | Location) {
  return new URL(location.href).pathname.concat(
    new URL(location.href).hash,
    new URL(location.href).search,
  );
}

export function applyQueries(queries: string, data: Data[]): Data[] {
  let newData = data.filter((elem) => {
    return elemInQuery(queries, elem);
  });
  newData = sortArr(queries, newData);
  return newData;
}

export function isInline(query: string): boolean {
  let result = false;
  if (queryHasParam(query, QueryParams.inline)) {
    query.split('&').forEach((el: string) => {
      if (el.split('=')[0] === QueryParams.inline) {
        if (el.split('=')[1] === 'true') {
          result = true;
        } else if (el.split('=')[1] === 'false') {
          result = false;
        }
      }
    });
  }
  return result;
}

function elemInQuery(query: string, element: Data): boolean {
  let category = true;
  let brand = true;
  let price = true;
  let stock = true;
  let search = true;
  // если параметр есть в квери, то мы проверяем содержит ли его элемент, если нет, то остается true, чтобы он пропускался
  if (queryHasParam(query, QueryParams.category)) {
    category = elemContainsQueryCategoryBrand(
      query,
      QueryParams.category,
      element,
    );
  }
  if (queryHasParam(query, QueryParams.brand)) {
    brand = elemContainsQueryCategoryBrand(query, QueryParams.brand, element);
  }
  if (queryHasParam(query, QueryParams.price)) {
    price = elemContainsQueryPriceStock(query, QueryParams.price, element);
  }
  if (queryHasParam(query, QueryParams.stock)) {
    stock = elemContainsQueryPriceStock(query, QueryParams.stock, element);
  }
  if (queryHasParam(query, QueryParams.search)) {
    search = elemContainsQuerySearch(query, QueryParams.search, element);
  }
  return category && brand && price && stock && search;
}

function sortArr(query: string, arrayToSort: Data[]): Data[] {
  let sortedArr: Data[] = arrayToSort;
  if (queryHasParam(query, QueryParams.sort)) {
    let sortString = '';
    query.split('&').forEach((el: string) => {
      if (el.split('=')[0] === QueryParams.sort) {
        sortString = el.split('=')[1];
      }
    });
    switch (sortString) {
      case 'price-ASC':
        sortedArr = arrayToSort.sort((a: Data, b: Data) => a.price - b.price);
        break;
      case 'price-DESC':
        sortedArr = arrayToSort.sort((a: Data, b: Data) => b.price - a.price);
        break;
      case 'rating-ASC':
        sortedArr = arrayToSort.sort((a: Data, b: Data) => a.rating - b.rating);
        break;
      case 'rating-DESC':
        sortedArr = arrayToSort.sort((a: Data, b: Data) => b.rating - a.rating);
        break;
    }
  }
  return sortedArr;
}

function queryHasParam(query: string, param: string): boolean {
  const queryArr = query.split('&');
  let result = false;
  queryArr.forEach((el: string) => {
    if (el.split('=')[0] === param) {
      result = true;
    }
  });
  return result;
}

//для текстовых параметров category, brand
function elemContainsQueryCategoryBrand(
  query: string,
  param: string,
  element: Data,
): boolean {
  const queryArr = query.split('&'); // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  let result = false;
  queryArr.forEach((el: string) => {
    if (el.split('=')[0] === param) {
      el.split('=')[1]
        .split('%') //Этим значком будем делить разные фильтры внутри категории,н.п. category=laptops%fragrances%...
        .forEach((val: string) => {
          if (val === String(element[param as keyof Data]).toLowerCase()) {
            result = true;
          }
        });
    }
  });
  return result;
}

//для числовых параметров price, stock
function elemContainsQueryPriceStock(
  query: string,
  param: string,
  element: Data,
): boolean {
  const queryArr = query.split('&'); // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  let result = false;
  queryArr.forEach((el: string) => {
    if (el.split('=')[0] === param) {
      const min = Number(el.split('=')[1].split('%')[0]);
      const max = Number(el.split('=')[1].split('%')[1]);
      if (
        element[param as keyof Data] >= min &&
        element[param as keyof Data] <= max
      ) {
        result = true;
      }
    }
  });
  return result;
}

//для поиска search
function elemContainsQuerySearch(
  query: string,
  param: string,
  element: Data,
): boolean {
  const queryArr = query.split('&'); // вид ссылки будет такой category=laptops%fragrances&brand=Samsung&price=600%1400...
  let result = false;
  queryArr.forEach((el: string) => {
    if (el.split('=')[0] === param) {
      const searchString = el.split('=')[1].split('%').join(' ').toLowerCase();
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
        result = true;
      }
    }
  });
  return result;
}
