import CartItem from '../../common/components/cart-item/CartItem';
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
