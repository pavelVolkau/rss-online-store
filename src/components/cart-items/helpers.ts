import CartItem from '../../common/components/cart-item/CartItem';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { addQuery } from '../../common/helpers/addQuery';
import { QUERY_PARAMS } from '../../common/helpers/constants';
import { localStorageData } from '../../common/types/localStorageData';

export function drawItemsPage(
  arrData: localStorageData[],
  limitGoods: number,
  page: number,
) {
  const DOMFragment = new DocumentFragment();
  const startIndex = limitGoods * (page - 1);
  const endIndex = startIndex + limitGoods;
  const arrDataWithIndex = arrData.map((obj, index) => {
    obj.index = index + 1;
    return obj;
  });
  const arrToDraw = arrDataWithIndex.slice(startIndex, endIndex);

  arrToDraw.forEach((obj) => {
    DOMFragment.append(new CartItem(obj).draw());
  });

  return DOMFragment;
}

export function resolveActualPage(
  currentPage: number,
  currentLimit: number,
  currentLink?: string,
): string | void {
  const storageData = LocalStorage.getLocalStorageData() as localStorageData[];
  const maxPageNumber = Math.ceil(storageData.length / currentLimit);

  if (maxPageNumber < currentPage) {
    const newLink = addQuery(
      QUERY_PARAMS.page,
      maxPageNumber.toString(),
      false,
      currentLink,
    );

    return newLink;
  }
}
