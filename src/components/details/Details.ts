import './details.scss';
import { CAPTIONS, SYMBOLS, TAGS } from '../../common/helpers/constants';
import store from '../../common/redux/store';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Card } from '../card/Card';
import {
  BUTTON_TEXT,
  DETAILS_CLASSES,
  DETAILS_TEMPLATE,
  IMG_ALT,
} from './constants';
import { Button } from '../../common/components/button/Button';
import {
  decreaseGoodsCount,
  increaseGoodsCount,
} from '../../common/redux/goodsCount';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { localStorageData } from '../../common/types/localStorageData';
import { addPrice, subtractPrice } from '../../common/redux/priceSum';

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
      const image = getDOMElement(
        TAGS.img,
        DETAILS_CLASSES.img,
      ) as HTMLImageElement;

      image.src = url;
      image.alt = IMG_ALT;

      detailsSlides.appendChild(image);

      image.addEventListener('click', () => {
        detailsMainImg.style.backgroundImage = `url(${image.src})`;
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
    detailsPrice.innerText = SYMBOLS.dollar + String(this.price);

    const detailsDiscount = detailsClone.querySelector(
      DETAILS_CLASSES.discount,
    ) as HTMLElement;
    detailsDiscount.innerText =
      SYMBOLS.minus + String(this.discountPercentage) + SYMBOLS.percent;

    const detailsRating = detailsClone.querySelector(
      DETAILS_CLASSES.rating,
    ) as HTMLElement;
    detailsRating.innerText = String(this.rating);

    const detailsStock = detailsClone.querySelector(
      DETAILS_CLASSES.stock,
    ) as HTMLElement;
    detailsStock.innerText = CAPTIONS.left + String(this.stock);

    const buttons = detailsClone.querySelector(
      DETAILS_CLASSES.buttons,
    ) as HTMLElement;

    const addBtn = new Button(
      DETAILS_CLASSES.addBtn,
      BUTTON_TEXT.addBtn,
    ).draw();

    const storage: localStorageData[] = LocalStorage.getLocalStorageData();
    const idArrFromStorage = storage.map((el) => el.id);

    if (idArrFromStorage.includes(this.id)) {
      addBtn.classList.add(DETAILS_CLASSES.addBtnAdded);
    }

    addBtn.addEventListener('click', () => {
      const storageObject: localStorageData = {
        id: this.id,
        count: 1,
        data: this.data,
      };

      if (addBtn.classList.contains(DETAILS_CLASSES.addBtnAdded)) {
        store.dispatch(decreaseGoodsCount(1));
        store.dispatch(subtractPrice(this.price));
        addBtn.classList.remove(DETAILS_CLASSES.addBtnAdded);
        LocalStorage.removeDataToLocalStorage(storageObject);
      } else {
        store.dispatch(increaseGoodsCount(1));
        store.dispatch(addPrice(this.price));
        addBtn.classList.add(DETAILS_CLASSES.addBtnAdded);
        LocalStorage.addDataToLocalStorage(storageObject);
      }
    });

    const buyNowBtn = new Button(
      DETAILS_CLASSES.buyNowBtn,
      BUTTON_TEXT.buyNowBtn,
    ).draw();

    //TODO: добавить вызов модального окна при нажатии на кнопку

    buttons.append(addBtn, buyNowBtn);

    return detailsClone;
  }
}
