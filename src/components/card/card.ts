import { Data } from '../../common/types/data';

export class Card {
  public readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  get brand(): string {
    return this.data.brand;
  }
  get description(): string {
    return this.data.description;
  }
  get discountPercentage(): number {
    return this.data.discountPercentage;
  }
  get id(): number {
    return this.data.id;
  }
  get images(): string[] {
    return this.data.images;
  }
  get price(): number {
    return this.data.price;
  }
  get rating(): number {
    return this.data.rating;
  }
  get stock(): number {
    return this.data.stock;
  }
  get thumbnail(): string {
    return this.data.thumbnail;
  }
  get title(): string {
    return this.data.title;
  }

  // Метод только возвращает отрисованную карточку, никуда ее пока не добавляет
  public draw(): HTMLElement {
    const cardTemplate = document.querySelector(
      '#card-template',
    ) as HTMLTemplateElement;
    const cardClone = cardTemplate.content.cloneNode(true) as HTMLElement;

    // Чтобы название вмещалось в одну строку удаляем лишние символы, если они есть, и добавляем многоточие
    let title: string = this.data.title;
    if (title.length > 20) {
      title = `${title.slice(0, 20)}...`;
    }

    const cardTitle = cardClone.querySelector('.card__title') as HTMLElement;
    cardTitle.innerText = title;

    const cardImg = cardClone.querySelector('.card__img') as HTMLElement;
    cardImg.style.backgroundImage = `url(${this.data.thumbnail})`;

    const cardCategory = cardClone.querySelector(
      '.card__category',
    ) as HTMLElement;
    cardCategory.innerText = `Category: ${this.data.category}`;

    const cardBrand = cardClone.querySelector('.card__brand') as HTMLElement;
    cardBrand.innerText = `Brand: ${this.data.brand}`;

    const cardPrice = cardClone.querySelector('.card__price') as HTMLElement;
    cardPrice.innerText = `$${this.data.price}`;

    const cardDiscount = cardClone.querySelector(
      '.card__discount',
    ) as HTMLElement;
    cardDiscount.innerText = `-${this.data.discountPercentage}%`;

    const cardRating = cardClone.querySelector('.card__rating') as HTMLElement;
    cardRating.innerText = `${this.data.rating}`;

    const cardStock = cardClone.querySelector('.card__stock') as HTMLElement;
    cardStock.innerText = `left: ${this.data.stock}`;

    return cardClone;
  }
}
