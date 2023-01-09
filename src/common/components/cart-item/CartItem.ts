import { Card } from '../../../components/card/Card';
import IDrawComponent from '../../interface/IDrawComponent';
import { Data } from '../../types/data';
import { localStorageData } from '../../types/localStorageData';
import LocalStorage from '../localStorage/LocalStorage';
import CONSTANTS from './constants';
import './cart-item.scss';
import { ROUTES, SEPARATORS, SYMBOLS } from '../../helpers/constants';
import changePriceCount from './helpers';
import { Button } from '../button/Button';
import { goTo } from '../../../router/router';

export default class CartItem extends Card implements IDrawComponent {
  private readonly description: Data['description'];
  private readonly index: number;

  constructor(data: localStorageData) {
    super(data.data);
    this.description = data.data.description;
    this.index = data.index as number;
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
    const currentCount = cartItem.querySelector(
      CONSTANTS.currentCount.class,
    ) as HTMLElement;
    const amountInfo = cartItem.querySelector(
      CONSTANTS.amountInfo.class,
    ) as HTMLElement;
    const incCount = new Button(
      CONSTANTS.incCount.class,
      CONSTANTS.incCount.text,
    ).draw();
    const decCount = new Button(
      CONSTANTS.decCount.class,
      CONSTANTS.decCount.text,
    ).draw();

    currentCount.before(incCount);
    currentCount.after(decCount);

    itemIndex.innerText = this.index.toString();
    itemImage.src = this.thumbnail;
    itemImage.alt = CONSTANTS.itemImage.alt;
    itemTitle.innerText = this.title;
    itemDescription.innerText = this.description;
    itemRating.innerText = this.rating.toString();
    itemDiscount.innerText = `${SYMBOLS.minus}${this.discountPercentage}${SYMBOLS.percent}`;
    stockInfo.innerText = `${CONSTANTS.stockInfo.prefix} ${this.stock}`;
    currentCount.innerText = countGoods.toString();
    amountInfo.innerText = `${SYMBOLS.dollar}${(
      countGoods * this.price
    ).toString()}`;

    itemImage.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(ROUTES.details + SEPARATORS.path + this.id);
    });

    incCount.addEventListener('click', () => {
      const countGoods = parseInt(currentCount.innerText) + 1;

      changePriceCount(
        countGoods,
        this,
        amountInfo,
        currentCount,
        CONSTANTS.increment,
      );
    });

    decCount.addEventListener('click', () => {
      const countGoods = parseInt(currentCount.innerText) - 1;

      if (countGoods >= 0) {
        changePriceCount(
          countGoods,
          this,
          amountInfo,
          currentCount,
          CONSTANTS.decrement,
        );
      }
    });

    return cartItem;
  }
}
