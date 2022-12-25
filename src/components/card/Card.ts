import './card.scss';
import { Data } from '../../common/types/data';
import { goTo } from '../../router/router';

export class Card {
  private readonly data: Data;
  private readonly brand: Data['brand'];
  private readonly category: Data['category'];
  // private readonly description: Data['description'];
  private readonly discountPercentage: Data['discountPercentage'];
  private readonly id: Data['id'];
  // private readonly images: Data['images'];
  private readonly price: Data['price'];
  private readonly rating: Data['rating'];
  private readonly stock: Data['stock'];
  private readonly thumbnail: Data['thumbnail'];
  private readonly title: Data['title'];

  constructor(data: Data) {
    this.data = data;
    this.brand = this.data.brand;
    this.category = this.data.category;
    // this.description = this.data.description;
    this.discountPercentage = this.data.discountPercentage;
    this.id = this.data.id;
    // this.images = this.data.images;
    this.price = this.data.price;
    this.rating = this.data.rating;
    this.stock = this.data.stock;
    this.thumbnail = this.data.thumbnail;
    this.title = this.data.title;
  }

  // Метод только возвращает отрисованную карточку, никуда ее пока не добавляет
  public draw(view?: boolean): HTMLElement {
    let cardTemplate = document.querySelector(
      '#card-template',
    ) as HTMLTemplateElement;
    if (view) {
      cardTemplate = document.querySelector(
        '#card-template-inline',
      ) as HTMLTemplateElement;
    }

    const cardClone = cardTemplate.content.cloneNode(true) as HTMLElement;

    // Чтобы название вмещалось в одну строку удаляем лишние символы, если они есть, и добавляем многоточие
    let title: string = this.title;
    if (title.length > 20) {
      title = `${title.slice(0, 20)}...`;
    }

    const cardTitle = cardClone.querySelector('.card__title') as HTMLElement;
    cardTitle.innerText = title;

    const cardImg = cardClone.querySelector('.card__img') as HTMLElement;
    cardImg.style.backgroundImage = `url(${this.thumbnail})`;

    cardImg.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(`/details#${this.id}`);
    }); //листнер перехода на др страницу

    const cardCategory = cardClone.querySelector(
      '.card__category',
    ) as HTMLElement;
    cardCategory.innerText = `Category: ${this.category}`;

    const cardBrand = cardClone.querySelector('.card__brand') as HTMLElement;
    cardBrand.innerText = `Brand: ${this.brand}`;

    const cardPrice = cardClone.querySelector('.card__price') as HTMLElement;
    cardPrice.innerText = `$${this.price}`;

    const cardDiscount = cardClone.querySelector(
      '.card__discount',
    ) as HTMLElement;
    cardDiscount.innerText = `-${this.discountPercentage}%`;

    const cardRating = cardClone.querySelector('.card__rating') as HTMLElement;
    cardRating.innerText = `${this.rating}`;

    const cardStock = cardClone.querySelector('.card__stock') as HTMLElement;
    cardStock.innerText = `left: ${this.stock}`;

    // может можно в эти листнеры передать сразу this.data?

    // const addBtn = new Button('', (e) => { addToCart(e) });                 //листнер добавленя в корзину
    // addBtn.classList.add('add-to-cart');                                   //особые стили для кнопки добавления в корзину
    // const detailsBtn = new Button('Details', (e) => { changePage(e) });     //листнер перехода на др страницу

    // const cardBtns = cardClone.querySelector('.card__buttons') as HTMLElement;
    // cardBtns.append(addBtn, detailsBtn);                                   //добавляем кнопки к шаблону

    return cardClone;
  }
}
