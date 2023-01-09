import './card.scss';
import { Data } from '../../common/types/data';
import { goTo } from '../../router/router';
import IDrawComponent from '../../common/interface/IDrawComponent';
import store from '../../common/redux/store';
import {
  CAPTIONS,
  ROUTES,
  SEPARATORS,
  SYMBOLS,
} from '../../common/helpers/constants';
import {
  BUTTON_TEXT,
  CARD_CLASSES,
  CARD_TEMPLATE_DEFAULT,
  CARD_TEMPLATE_INLINE,
  TITLE_LENGTH,
} from './constants';
import { Button } from '../../common/components/button/Button';
import {
  decreaseGoodsCount,
  increaseGoodsCount,
} from '../../common/redux/goodsCount';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { localStorageData } from '../../common/types/localStorageData';
import { addPrice, subtractPrice } from '../../common/redux/priceSum';

export class Card implements IDrawComponent {
  public readonly data: Data;
  protected readonly brand: Data['brand'];
  protected readonly category: Data['category'];
  protected readonly discountPercentage: Data['discountPercentage'];
  public readonly id: Data['id'];
  public readonly price: Data['price'];
  protected readonly rating: Data['rating'];
  protected readonly stock: Data['stock'];
  protected readonly thumbnail: Data['thumbnail'];
  protected readonly title: Data['title'];

  private readonly view: boolean | undefined;

  constructor(data: Data, view?: boolean) {
    this.data = data;
    this.brand = this.data.brand;
    this.category = this.data.category;
    this.discountPercentage = this.data.discountPercentage;
    this.id = this.data.id;
    this.price = this.data.price;
    this.rating = this.data.rating;
    this.stock = this.data.stock;
    this.thumbnail = this.data.thumbnail;
    this.title = this.data.title;

    if (view) {
      this.view = view;
    }
  }

  // Метод только возвращает отрисованную карточку, никуда ее пока не добавляет
  public draw(): HTMLElement {
    let cardClone = CARD_TEMPLATE_DEFAULT.content.cloneNode(
      true,
    ) as HTMLElement;

    if (this.view) {
      cardClone = CARD_TEMPLATE_INLINE.content.cloneNode(true) as HTMLElement;
    }

    // Чтобы название вмещалось в одну строку удаляем лишние символы, если они есть, и добавляем многоточие
    let title: string = this.title;
    if (title.length > TITLE_LENGTH) {
      title = title.slice(0, TITLE_LENGTH) + SYMBOLS.dots;
    }

    const cardTitle = cardClone.querySelector(
      CARD_CLASSES.title,
    ) as HTMLElement;
    cardTitle.innerText = title;

    const cardImg = cardClone.querySelector(CARD_CLASSES.img) as HTMLElement;
    cardImg.style.backgroundImage = `url(${this.thumbnail})`;

    cardImg.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(`${ROUTES.details + SEPARATORS.path}${this.id}`);
    }); //листнер перехода на др страницу

    const cardCategory = cardClone.querySelector(
      CARD_CLASSES.category,
    ) as HTMLElement;
    cardCategory.innerText = CAPTIONS.category + this.category;

    const cardBrand = cardClone.querySelector(
      CARD_CLASSES.brand,
    ) as HTMLElement;
    cardBrand.innerText = CAPTIONS.brand + this.brand;

    const cardPrice = cardClone.querySelector(
      CARD_CLASSES.price,
    ) as HTMLElement;
    cardPrice.innerText = SYMBOLS.dollar + String(this.price);

    const cardDiscount = cardClone.querySelector(
      CARD_CLASSES.discount,
    ) as HTMLElement;
    cardDiscount.innerText =
      SYMBOLS.minus + String(this.discountPercentage) + SYMBOLS.percent;

    const cardRating = cardClone.querySelector(
      CARD_CLASSES.rating,
    ) as HTMLElement;
    cardRating.innerText = String(this.rating);

    const cardStock = cardClone.querySelector(
      CARD_CLASSES.stock,
    ) as HTMLElement;
    cardStock.innerText = CAPTIONS.left + String(this.stock);

    //добавить на кнопку состояние в зависимость от того естьь ли товар в локал сторадже
    const addBtn = new Button(CARD_CLASSES.addBtn, BUTTON_TEXT.addBtn).draw();
    const storage: localStorageData[] = LocalStorage.getLocalStorageData();
    const idArrFromStorage = storage.map((el) => el.id);

    if (idArrFromStorage.includes(this.id)) {
      addBtn.classList.add(CARD_CLASSES.addBtnAdded);
    }

    addBtn.addEventListener('click', () => {
      const storageObject: localStorageData = {
        id: this.id,
        count: 1,
        data: this.data,
      };

      if (addBtn.classList.contains(CARD_CLASSES.addBtnAdded)) {
        store.dispatch(decreaseGoodsCount(1));
        store.dispatch(subtractPrice(this.price));
        addBtn.classList.remove(CARD_CLASSES.addBtnAdded);
        LocalStorage.removeDataToLocalStorage(storageObject);
      } else {
        store.dispatch(increaseGoodsCount(1));
        store.dispatch(addPrice(this.price));
        addBtn.classList.add(CARD_CLASSES.addBtnAdded);
        LocalStorage.addDataToLocalStorage(storageObject);
      }
    });

    const detailsBtn = new Button(
      CARD_CLASSES.detailsBtn,
      BUTTON_TEXT.detailsBtn,
    ).draw();

    detailsBtn.addEventListener('click', () => {
      goTo(`${ROUTES.details + SEPARATORS.path}${this.id}`);
    });

    const cardBtns = cardClone.querySelector(
      CARD_CLASSES.buttons,
    ) as HTMLElement;
    cardBtns.append(addBtn, detailsBtn);

    return cardClone;
  }
}
