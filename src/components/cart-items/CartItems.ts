import { QUERY_PARAMS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import getQueryURI from '../../common/helpers/getQueryURI';
import IDrawComponent from '../../common/interface/IDrawComponent';
import CONSTANTS from './constants';
import './cart-items.scss';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { localStorageData } from '../../common/types/localStorageData';
import { resolveActualPage } from './helpers';
import { goTo } from '../../router/router';
import { addQuery } from '../../common/helpers/addQuery';
import { Button } from '../../common/components/button/Button';
import ListGoodsCart from '../../common/components/list-goods-cart/ListGoodsCart';
import { createLink } from '../../common/helpers/createLink';

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
    const headerTemplate = cartItems.querySelector(
      CONSTANTS.header.class,
    ) as HTMLElement;
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
    const currentPage = cartItems.querySelector(
      CONSTANTS.currentPage.class,
    ) as HTMLElement;
    const pagePrev = new Button(
      CONSTANTS.pagePrev.class,
      CONSTANTS.pagePrev.text,
    ).draw();
    const pageNext = new Button(
      CONSTANTS.pageNext.class,
      CONSTANTS.pageNext.text,
    ).draw();

    currentPage.before(pagePrev);
    currentPage.after(pageNext);

    title.innerText = CONSTANTS.title.text;
    limitLabel.innerText = CONSTANTS.limitLabel.text;
    pageInfo.innerText = CONSTANTS.pageInfo.text;

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

    const itemsContainer = new ListGoodsCart(
      storageData,
      parseInt(limitInput.value),
      parseInt(currentPage.innerText),
    ).draw();
    // первичная отрисовка товаров
    headerTemplate.after(itemsContainer);

    // если 0 штук данного товара, то удалить его из корзины
    itemsContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const cartItem = target.closest(CONSTANTS.cartItem.class) as HTMLElement;
      const elementWithCountItems = cartItem.querySelector(
        CONSTANTS.currentCount.class,
      ) as HTMLElement;
      const itemCount = parseInt(elementWithCountItems.innerText);

      if (itemCount === 0) {
        itemsContainer.removeChild(cartItem);

        const currentLink = createLink(window.location);
        const newLink = resolveActualPage(pageNumber, limitNumber);

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
