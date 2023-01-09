import { Data } from '../types/data';
import { localStorageData } from '../types/localStorageData';
import store from '../redux/store';
import { decreaseGoodsCount, increaseGoodsCount } from '../redux/goodsCount';
import { addPrice, subtractPrice } from '../redux/priceSum';
import LocalStorage from '../components/localStorage/LocalStorage';
import { BTN_CLASS_ADDED } from './constants';

export function addBtnListener(
  data: Data,
  addBtn: HTMLElement,
  storage: localStorageData[],
) {
  const newStorageObject: localStorageData = {
    id: data.id,
    count: 1,
    data: data,
  };

  const oldStorageObj = storage.filter((val) => val.id === data.id)[0];

  if (addBtn.classList.contains(BTN_CLASS_ADDED)) {
    store.dispatch(decreaseGoodsCount(oldStorageObj.count));
    store.dispatch(subtractPrice(data.price * oldStorageObj.count));
    addBtn.classList.remove(BTN_CLASS_ADDED);
    LocalStorage.removeDataToLocalStorage(oldStorageObj);
  } else {
    store.dispatch(increaseGoodsCount(1));
    store.dispatch(addPrice(data.price));
    addBtn.classList.add(BTN_CLASS_ADDED);
    LocalStorage.addDataToLocalStorage(newStorageObject);
  }
}
