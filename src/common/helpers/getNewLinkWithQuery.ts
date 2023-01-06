import { QUERY_PARAMS, SEPARATORS } from './constants';
import getQueryURI from './getQueryURI';

type queryObjectType = {
  [key: string]: string[];
};

const arrayKeysWithOneValue = [
  QUERY_PARAMS.sort,
  QUERY_PARAMS.search,
  QUERY_PARAMS.inline,
  QUERY_PARAMS.page,
  QUERY_PARAMS.limit,
];

export default function getNewLinkWithQuery(
  href: string,
  key: string,
  value: string,
  del = false,
): string {
  const currentPath = href.split(SEPARATORS.searchQuery)[0]; //разделение по ?, тут находится путь до квери строки
  const currentQuery = getQueryURI(href); //тут находиться только квери строка без знака ?
  const queryObject: queryObjectType = {}; //тут будут храниться значения текущей квери строки

  //сохраняем текущую квери строку в объект категория: ['параметр', 'параметр', ...]
  if (currentQuery) {
    const arrQueryChunk = currentQuery.split(SEPARATORS.queryParams); //разделение по &, тут будет массив со всеми ключами и их знаечниями

    arrQueryChunk.forEach((str) => {
      const arrSplitKeyValues = str.split(SEPARATORS.paramsAndSubcategories); //разделение по =, массив с ключем и всеми его значениями
      const key = arrSplitKeyValues[0];
      const arrValue = arrSplitKeyValues[1].split(SEPARATORS.subcategory); //разделение по ^, массив со значениями для этого ключа

      queryObject[key] = arrValue;
    });
  }

  //проверяем надо ли удалить свойство
  if (del) {
    //проверяем есть ли такая категория в объекте с текущими квери параметрами
    if (Object.keys(queryObject).includes(key)) {
      const values = queryObject[key];
      const valueIndex = values.indexOf(value);

      values.splice(valueIndex, 1);

      //если после удаления параметра у категории их больше не осталось, удаляем ее, иначе присваиваем оставшиеся
      if (values.length === 0) {
        delete queryObject[key];
      } else {
        queryObject[key] = values;
      }
    }
  }

  //если категории нет в объекте или категория может быть только с одним параметром присваиваем его, иначе пушим к остальным параметром этой категории
  if (
    !Object.keys(queryObject).includes(key) ||
    arrayKeysWithOneValue.includes(key)
  ) {
    queryObject[key] = [value];
  } else {
    queryObject[key].push(value);
  }

  return createLink(currentPath, queryObject);
}

//функция создает итоговую ссылку, собирая все квери, а потом склеивает их с основным путем
function createLink(path: string, objQuery: queryObjectType): string {
  const objEntries = Object.entries(objQuery);
  const arrQuery = objEntries.map(
    (arr) =>
      `${arr[0]}${SEPARATORS.paramsAndSubcategories}${arr[1].join(
        SEPARATORS.subcategory,
      )}`,
  );

  return `${path}${SEPARATORS.searchQuery}${arrQuery.join(
    SEPARATORS.queryParams,
  )}`;
}
