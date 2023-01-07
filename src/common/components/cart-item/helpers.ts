import { SYMBOLS } from '../../helpers/constants';
import { decreaseGoodsCount, increaseGoodsCount } from '../../redux/goodsCount';
import { addPrice, subtractPrice } from '../../redux/priceSum';
import store from '../../redux/store';
import { localStorageData } from '../../types/localStorageData';
import LocalStorage from '../localStorage/LocalStorage';
import CartItem from './CartItem';
import CONSTANTS from './constants';

export default function changePriceCount(
  countGoods: number,
  obj: CartItem,
  amountInfo: HTMLElement,
  currentCount: HTMLElement,
  incDec: string,
): void {
  const newData: localStorageData = {
    id: obj.id,
    data: obj.data,
    count: countGoods,
  };

  if (incDec === CONSTANTS.increment) {
    store.dispatch(increaseGoodsCount(1));
    store.dispatch(addPrice(obj.price));
  }
  if (incDec === CONSTANTS.decrement) {
    store.dispatch(decreaseGoodsCount(1));
    store.dispatch(subtractPrice(obj.price));
  }

  amountInfo.innerText = `${SYMBOLS.dollar}${(
    countGoods * obj.price
  ).toString()}`;
  currentCount.innerText = countGoods.toString();
  LocalStorage.addDataToLocalStorage(newData);
}
