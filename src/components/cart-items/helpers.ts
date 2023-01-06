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
  const arrToDraw = arrData.slice(startIndex, endIndex);

  arrToDraw.forEach((obj, index) => {
    DOMFragment.append(new CartItem(obj, index + 1).draw());
  });

  return DOMFragment;
}
