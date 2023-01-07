import { QUERY_PARAMS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import getQueryURI from '../../common/helpers/getQueryURI';
import IDrawComponent from '../../common/interface/IDrawComponent';
import CONSTANTS from './constants';
import './cart-items.scss';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { localStorageData } from '../../common/types/localStorageData';
import { drawItemsPage, resolveActualPage } from './helpers';
import { goTo } from '../../router/router';
import { addQuery } from '../../common/helpers/addQuery';

export default class CartItems implements IDrawComponent {
  public draw(): HTMLElement {
    const storageData =
      LocalStorage.getLocalStorageData() as localStorageData[];
    const queryURI = getQueryURI(document.location.href);
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

    // если 0 штук данного товара, то удалить его из корзины
    itemContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const cartItem = target.closest('.cart-item') as HTMLElement;
      const elementWithCountItems = cartItem.querySelector(
        '.cart-item__current-count',
      ) as HTMLElement;
      const itemCount = parseInt(elementWithCountItems.innerText);

      if (itemCount === 0) {
        itemContainer.removeChild(cartItem);

        const currentLink = document.location.href;
        const newLink = resolveActualPage(pageNumber, limitNumber);

        //! FIX пофиксить что когда товар удаляется, и ссылка остается прежней(старница существует согласно лимитов) выскакивает 404
        if (newLink) {
          goTo(newLink);
        } else {
          goTo(currentLink);
        }
      }
    });

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

      const newLink = addQuery(
        QUERY_PARAMS.limit,
        currentLimitInput.toString(),
      );
      //если текущая страница отсутствует при повышении лимита
      const newActualLink = resolveActualPage(
        pageNumber,
        currentLimitInput,
        newLink,
      );

      if (newActualLink) {
        goTo(newActualLink);
      } else {
        goTo(newLink);
      }
    });

    // пагинация
    pagePrev.addEventListener('click', () => {
      const minPageNumber = CONSTANTS.minPageNumber;
      const currentPageNumber = pageNumber - 1;

      if (currentPageNumber >= minPageNumber) {
        const newLink = addQuery(
          QUERY_PARAMS.page,
          currentPageNumber.toString(),
        );

        goTo(newLink);
      }
    });

    pageNext.addEventListener('click', () => {
      const maxPageNumber = Math.ceil(
        storageData.length / parseInt(limitInput.value),
      );
      const currentPageNumber = pageNumber + 1;

      if (currentPageNumber <= maxPageNumber) {
        const newLink = addQuery(
          QUERY_PARAMS.page,
          currentPageNumber.toString(),
        );

        goTo(newLink);
      }
    });

    return cartItems;
  }
}
