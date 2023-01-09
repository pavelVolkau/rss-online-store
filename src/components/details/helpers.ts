import { Data } from '../../common/types/data';
import { localStorageData } from '../../common/types/localStorageData';
import store from '../../common/redux/store';
import { increaseGoodsCount } from '../../common/redux/goodsCount';
import { addPrice } from '../../common/redux/priceSum';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { goTo } from '../../router/router';
import { BTN_CLASS_ADDED, ROUTES } from '../../common/helpers/constants';

export function buyNowListener(data: Data, addBtn: HTMLElement) {
  const storageObject: localStorageData = {
    id: data.id,
    count: 1,
    data: data,
  };

  if (!addBtn.classList.contains(BTN_CLASS_ADDED)) {
    store.dispatch(increaseGoodsCount(1));
    store.dispatch(addPrice(data.price));
    addBtn.classList.add(BTN_CLASS_ADDED);
    LocalStorage.addDataToLocalStorage(storageObject);
  }

  goTo(ROUTES.cart, false, undefined, true);
}
