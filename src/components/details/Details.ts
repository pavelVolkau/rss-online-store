import './details.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Card } from '../card/Card';
import { DETAILS_CLASSES, DETAILS_TEMPLATE } from './constants';

export class Details extends Card implements IDrawComponent {
  private readonly description: Data['description'];
  private readonly images: Data['images'];

  constructor(data: Data) {
    super(data);

    this.images = this.data.images;
    this.description = this.data.description;
  }

  public draw(): HTMLElement {
    const detailsClone = DETAILS_TEMPLATE.content.cloneNode(
      true,
    ) as HTMLElement;

    const detailsTitle = detailsClone.querySelector(
      DETAILS_CLASSES.title,
    ) as HTMLElement;
    detailsTitle.innerText = this.title;

    const detailsSlides = detailsClone.querySelector(
      DETAILS_CLASSES.slides,
    ) as HTMLElement;

    const detailsMainImg = detailsClone.querySelector(
      DETAILS_CLASSES.mainImg,
    ) as HTMLElement;
    detailsMainImg.style.backgroundImage = `url(${this.images[0]})`;

    this.images.forEach((url) => {
      const image = getDOMElement(TAGS.div, DETAILS_CLASSES.img) as HTMLElement;
      image.style.backgroundImage = `url(${url})`;
      detailsSlides.appendChild(image);
      image.addEventListener('click', () => {
        detailsMainImg.style.backgroundImage = image.style.backgroundImage;
      });
    });

    const detailsDescription = detailsClone.querySelector(
      DETAILS_CLASSES.description,
    ) as HTMLElement;
    detailsDescription.innerText = this.description;

    const detailsCategory = detailsClone.querySelector(
      DETAILS_CLASSES.category,
    ) as HTMLElement;
    detailsCategory.innerText = this.category;

    const detailsBrand = detailsClone.querySelector(
      DETAILS_CLASSES.brand,
    ) as HTMLElement;
    detailsBrand.innerText = this.brand;

    const detailsPrice = detailsClone.querySelector(
      DETAILS_CLASSES.price,
    ) as HTMLElement;
    detailsPrice.innerText = String(this.price);

    const detailsDiscount = detailsClone.querySelector(
      DETAILS_CLASSES.discount,
    ) as HTMLElement;
    detailsDiscount.innerText = String(this.discountPercentage);

    const detailsRating = detailsClone.querySelector(
      DETAILS_CLASSES.rating,
    ) as HTMLElement;
    detailsRating.innerText = String(this.rating);

    const detailsStock = detailsClone.querySelector(
      DETAILS_CLASSES.stock,
    ) as HTMLElement;
    detailsStock.innerText = String(this.stock);

    return detailsClone;
  }
}
