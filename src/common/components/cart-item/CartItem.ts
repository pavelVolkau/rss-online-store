import { Card } from '../../../components/card/Card';
import { SYMBOLS } from '../../../components/card/constants';
import IDrawComponent from '../../interface/IDrawComponent';
import { Data } from '../../types/data';
import { localStorageData } from '../../types/localStorageData';
import LocalStorage from '../localStorage/LocalStorage';
import CONSTANTS from './constants';
import './cart-item.scss';
import { decreaseGoodsCount, increaseGoodsCount } from '../../redux/goodsCount';
import store from '../../redux/store';
import { addPrice, subtractPrice } from '../../redux/priceSum';

export default class CartItem extends Card implements IDrawComponent {
  private readonly description: Data['description'];

  constructor(data: localStorageData, private index: number) {
    super(data.data);
    this.description = data.data.description;
  }

  public draw() {
    const localStorageInfo = LocalStorage.getLocalStorageData()?.filter(
      (obj) => obj.id === this.id,
    )[0] as localStorageData;
    const countGoods = localStorageInfo.count;
    const cartItemTemplate = document.querySelector(
      CONSTANTS.DOMtemplate,
    ) as HTMLTemplateElement;
    const cartItem = cartItemTemplate.content.cloneNode(true) as HTMLElement;

    const itemIndex = cartItem.querySelector(
      CONSTANTS.itemIndex.class,
    ) as HTMLElement;
    const itemImage = cartItem.querySelector(
      CONSTANTS.itemImage.class,
    ) as HTMLImageElement;
    const itemTitle = cartItem.querySelector(
      CONSTANTS.itemTitle.class,
    ) as HTMLElement;
    const itemDescription = cartItem.querySelector(
      CONSTANTS.itemDescription.class,
    ) as HTMLElement;
    const itemRating = cartItem.querySelector(
      CONSTANTS.itemRating.class,
    ) as HTMLElement;
    const itemDiscount = cartItem.querySelector(
      CONSTANTS.itemDiscount.class,
    ) as HTMLElement;
    const stockInfo = cartItem.querySelector(
      CONSTANTS.stockInfo.class,
    ) as HTMLElement;
    const incCount = cartItem.querySelector(
      CONSTANTS.incCount.class,
    ) as HTMLButtonElement;
    const decCount = cartItem.querySelector(
      CONSTANTS.decCount.class,
    ) as HTMLButtonElement;
    const currentCount = cartItem.querySelector(
      CONSTANTS.currentCount.class,
    ) as HTMLElement;
    const amountInfo = cartItem.querySelector(
      CONSTANTS.amountInfo.class,
    ) as HTMLElement;

    itemIndex.innerText = this.index.toString();
    itemImage.src = this.thumbnail;
    itemImage.alt = CONSTANTS.itemImage.alt;
    itemTitle.innerText = this.title;
    itemDescription.innerText = this.description;
    itemRating.innerText = this.rating.toString();
    itemDiscount.innerText = `${SYMBOLS.minus}${this.discountPercentage}${SYMBOLS.percent}`;
    stockInfo.innerText = `${CONSTANTS.stockInfo.prefix} ${this.stock}`;
    incCount.innerText = CONSTANTS.incCount.text;
    decCount.innerText = CONSTANTS.decCount.text;
    currentCount.innerText = countGoods.toString();
    amountInfo.innerText = `${SYMBOLS.dollar}${(
      countGoods * this.price
    ).toString()}`;

    incCount.addEventListener('click', () => {
      const countGoods = parseInt(currentCount.innerText) + 1;
      const newData: localStorageData = {
        id: this.id,
        data: this.data,
        count: countGoods,
      };

      store.dispatch(increaseGoodsCount(1));
      store.dispatch(addPrice(this.price));
      amountInfo.innerText = `${SYMBOLS.dollar}${(
        countGoods * this.price
      ).toString()}`;
      currentCount.innerText = countGoods.toString();
      LocalStorage.addDataToLocalStorage(newData);
    });

    decCount.addEventListener('click', () => {
      const countGoods = parseInt(currentCount.innerText) - 1;

      if (countGoods >= 0) {
        const newData: localStorageData = {
          id: this.id,
          data: this.data,
          count: countGoods,
        };

        store.dispatch(decreaseGoodsCount(1));
        store.dispatch(subtractPrice(this.price));
        amountInfo.innerText = `${SYMBOLS.dollar}${(
          countGoods * this.price
        ).toString()}`;
        currentCount.innerText = countGoods.toString();
        LocalStorage.addDataToLocalStorage(newData);
      }
    });

    return cartItem;
  }
}
