import './card.scss';
import { Data } from '../../common/types/data';
import { goTo } from '../../router/router';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { ROUTES, SEPARATORS } from '../../common/helpers/constants';
import {
  CAPTIONS,
  CARD_CLASSES,
  CARD_TEMPLATE_DEFAULT,
  CARD_TEMPLATE_INLINE,
  SYMBOLS,
  TITLE_LENGTH,
} from './constants';

export class Card implements IDrawComponent {
  protected readonly data: Data;
  protected readonly brand: Data['brand'];
  protected readonly category: Data['category'];
  protected readonly discountPercentage: Data['discountPercentage'];
  protected readonly id: Data['id'];
  protected readonly price: Data['price'];
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

    // может можно в эти листнеры передать сразу this.data?

    // const addBtn = new Button('', (e) => { addToCart(e) });                 //листнер добавленя в корзину
    // addBtn.classList.add('add-to-cart');                                   //особые стили для кнопки добавления в корзину
    // const detailsBtn = new Button('Details', (e) => { changePage(e) });     //листнер перехода на др страницу

    // const cardBtns = cardClone.querySelector('.card__buttons') as HTMLElement;
    // cardBtns.append(addBtn, detailsBtn);                                   //добавляем кнопки к шаблону

    return cardClone;
  }
}
