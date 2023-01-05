import { QUERY_PARAMS, ROUTES, SEPARATORS } from './constants';
import { getQueryParamSubcategories } from './getQueryParamSubcategories';

export function addQueryToMain(
  param: string,
  subcategory: string,
  remove = false,
): string {
  const locationSearch = window.location.search;

  //если квери строки еще пока никакой нет
  if (!locationSearch) {
    return (
      ROUTES.main +
      SEPARATORS.searchQuery +
      param +
      SEPARATORS.paramsAndSubcategories +
      subcategory
    );
  }

  //если квери строка есть
  const query = locationSearch.split(SEPARATORS.searchQuery)[1]; //убираем знак вопроса в начале

  //достаем все подкатегории для параметров
  const category = getQueryParamSubcategories(query, QUERY_PARAMS.category);
  const brand = getQueryParamSubcategories(query, QUERY_PARAMS.brand);
  const price = getQueryParamSubcategories(query, QUERY_PARAMS.price);
  const stock = getQueryParamSubcategories(query, QUERY_PARAMS.stock);
  const sort = getQueryParamSubcategories(query, QUERY_PARAMS.sort);
  const search = getQueryParamSubcategories(query, QUERY_PARAMS.search);
  const inline = getQueryParamSubcategories(query, QUERY_PARAMS.inline);

  //вспомогательный массив из названий параметров в той же последовательности что будет дальше массив с категориями
  const paramsArr = [
    QUERY_PARAMS.category,
    QUERY_PARAMS.brand,
    QUERY_PARAMS.price,
    QUERY_PARAMS.stock,
    QUERY_PARAMS.sort,
    QUERY_PARAMS.search,
    QUERY_PARAMS.inline,
  ];

  //массив, который подставляется название параметра=подкатегории, если подкатегории есть для этого параметра, если нет то undefined
  const ParamAndSubcatArr = [
    category,
    brand,
    price,
    stock,
    sort,
    search,
    inline,
  ].map((val, ind) => {
    //если название текущего параметра совпадает с тем который мы хотим внести в квери строку
    if (paramsArr[ind] === param) {
      //если значение подкатегории, которое мы хотим внести уже есть в нашем параметре, то оставляем как есть
      if (!val.includes(subcategory)) {
        //если такого значения еще нет, то добавляем его в массив подкатегорий (массив val)
        //но для сортировки, серча и инлайна подкатегория может быть только одна и она должна заменяться на новую
        if (
          param === QUERY_PARAMS.sort ||
          param === QUERY_PARAMS.search ||
          param === QUERY_PARAMS.inline
        ) {
          //поэтому мы очищаем массив для этих параметров, чтобы потом добавить новое значение, которое мы хотим внести
          val.splice(0, val.length);
        }

        //добавляем новое значение в массив подкатегорий
        val.push(subcategory);
      } else {
        //если remove указано в параметрах как true, то удаляем указанную в аргументах функции подкатегорию из массива
        if (remove) {
          const subcategoryInd = val.indexOf(subcategory);

          val.splice(subcategoryInd, 1);
        }
      }
    }

    //если у нас в параметр никакое значение не добавляется и старых подкатегорий у него нет, то возвращаем undefined в новый массив
    if (val.length === 0) {
      return;
    }

    //возвращаем элемент массива, который состоит из названия параметра (массив paramsArr по индексу), разделителя и склеиваем массив подкатегорий
    return (
      paramsArr[ind] +
      SEPARATORS.paramsAndSubcategories +
      val.join(SEPARATORS.subcategory)
    );
  });

  //фильтруем массив, так как в нем присутсвуют undefined для пропущенных параметров
  const filteredArr = ParamAndSubcatArr.filter((val) => val !== undefined);

  //возвращаем полностью склееную квери строку из всех параметров и новых и старых
  return (
    ROUTES.main +
    SEPARATORS.searchQuery +
    filteredArr.join(SEPARATORS.queryParams)
  );
}
