import { QUERY_PARAMS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import getQueryURI from '../../common/helpers/getQueryURI';
import IDrawComponent from '../../common/interface/IDrawComponent';
//import { goTo } from '../../router/router';
import CONSTANTS from './constants';
import './cart-items.scss';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { localStorageData } from '../../common/types/localStorageData';
import { drawItemsPage } from './helpers';

export default class CartItems implements IDrawComponent {
  public draw(): HTMLElement {
    const storageData =
      LocalStorage.getLocalStorageData() as localStorageData[];
    const queryURI = getQueryURI();
    let limitNumber: number;
    let pageNumber: number;

    const cartItemsTemplate = document.querySelector(
      CONSTANTS.DOMtemplate,
    ) as HTMLTemplateElement;
    const cartItems = cartItemsTemplate.content.cloneNode(true) as HTMLElement;

    // header
    const title = cartItems.querySelector(CONSTANTS.title.class) as HTMLElement;
    const limitLabel = cartItems.querySelector(
      CONSTANTS.limitLabel.class,
    ) as HTMLElement;
    const limitInput = cartItems.querySelector(
      CONSTANTS.limitInput.class,
    ) as HTMLInputElement;
    const pageInfo = cartItems.querySelector(
      CONSTANTS.pageInfo.class,
    ) as HTMLElement;
    const pagePrev = cartItems.querySelector(
      CONSTANTS.pagePrev.class,
    ) as HTMLButtonElement;
    const currentPage = cartItems.querySelector(
      CONSTANTS.currentPage.class,
    ) as HTMLElement;
    const pageNext = cartItems.querySelector(
      CONSTANTS.pageNext.class,
    ) as HTMLButtonElement;
    const itemContainer = cartItems.querySelector(
      CONSTANTS.itemContainer.class,
    ) as HTMLElement;

    title.innerText = CONSTANTS.title.text;
    limitLabel.innerText = CONSTANTS.limitLabel.text;
    pageInfo.innerText = CONSTANTS.pageInfo.text;
    pagePrev.innerText = CONSTANTS.pagePrev.text;
    pageNext.innerText = CONSTANTS.pageNext.text;

    // узнаем первичное количество товаров на странице
    const limitValueParams = getQueryParamSubcategories(
      queryURI,
      QUERY_PARAMS.limit,
    );

    if (limitValueParams.length === 0) {
      limitNumber = CONSTANTS.limitInput.initCount;
    } else {
      limitNumber = parseInt(limitValueParams[0]);
    }

    limitInput.value = limitNumber.toString();

    // узнаем первичный номер страницы
    const currentPageParams = getQueryParamSubcategories(
      queryURI,
      QUERY_PARAMS.page,
    );

    if (currentPageParams.length === 0) {
      pageNumber = CONSTANTS.currentPage.initCount;
    } else {
      pageNumber = parseInt(currentPageParams[0]);
    }

    currentPage.innerText = pageNumber.toString();

    // первичная отрисовка товаров
    itemContainer.append(
      drawItemsPage(
        storageData,
        parseInt(limitInput.value),
        parseInt(currentPage.innerText),
      ),
    );

    // изменения количества товаров на странице за раз
    limitInput.addEventListener('change', () => {
      let currentLimitInput = parseInt(limitInput.value);

      if (currentLimitInput < CONSTANTS.minLimitNumber) {
        currentLimitInput = CONSTANTS.minLimitNumber;
        limitInput.value = CONSTANTS.minLimitNumber.toString();
      }

      if (currentLimitInput > CONSTANTS.maxLimitNumber) {
        currentLimitInput = CONSTANTS.maxLimitNumber;
        limitInput.value = CONSTANTS.maxLimitNumber.toString();
      }

      limitNumber = currentLimitInput;
      //TODO: тут должна быть функция goTo() и добавление параметра в квери строку
    });

    // пагинация
    pagePrev.addEventListener('click', () => {
      const minPageNumber = CONSTANTS.minPageNumber;
      const currentPageNumber = pageNumber - 1;

      if (currentPageNumber >= minPageNumber) {
        pageNumber = currentPageNumber;
        //TODO: тут должна быть функция goTo() и добавление параметра в квери строку
        itemContainer.replaceChildren(
          drawItemsPage(storageData, limitNumber, pageNumber),
        );
      }
    });

    pageNext.addEventListener('click', () => {
      const maxPageNumber = Math.ceil(
        storageData.length / parseInt(limitInput.value),
      );
      const currentPageNumber = pageNumber + 1;

      if (currentPageNumber <= maxPageNumber) {
        pageNumber = currentPageNumber;
        //TODO: тут должна быть функция goTo() и добавление параметра в квери строку
        itemContainer.replaceChildren(
          drawItemsPage(storageData, limitNumber, pageNumber),
        );
      }
    });

    //TODO: доделать переход через goto
    /* limitInput.addEventListener('input', () => {
      const value = limitInput.value;

      goTo()
    }); */

    // body

    /*
    pageNext.addEventListener('click', () => {});

    storageData.forEach((obj, index) => {
      itemContainer.append(new CartItem(obj, index + 1).draw());
    }); */

    return cartItems;
  }
}
