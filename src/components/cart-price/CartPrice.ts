import IDrawComponent from '../../common/interface/IDrawComponent';
import CONSTANTS from './constants';
import './cart-price.scss';
import store, { initStore, RootState } from '../../common/redux/store';
import {
  HANDLER_EVENTS,
  LOCAL_STORAGE_KEYS,
  PROMO_CODES,
  TAGS,
} from '../../common/helpers/constants';
import PromoCodeResolve from '../../common/components/promo-code-resolve/PromoCodeResolve';
import { Button } from '../../common/components/button/Button';
import PromoCodeList from '../../common/components/promo-code-list/PromoCodeList';
import { priceCalculation } from './helpers';
import getDOMElement from '../../common/helpers/getDOMElement';

export default class CartPrice implements IDrawComponent {
  public draw() {
    const cartPriceTemplate = document.querySelector(
      CONSTANTS.DOMtemplate,
    ) as HTMLTemplateElement;
    const cartPrice = cartPriceTemplate.content.cloneNode(true) as HTMLElement;

    const title = cartPrice.querySelector(CONSTANTS.title.class) as HTMLElement;
    const container = cartPrice.querySelector(
      CONSTANTS.container.class,
    ) as HTMLElement;
    const productsCount = cartPrice.querySelector(
      CONSTANTS.productsCount.class,
    ) as HTMLElement;
    const totalPrice = cartPrice.querySelector(
      CONSTANTS.totalPrice.class,
    ) as HTMLElement;
    const promoInput = cartPrice.querySelector(
      CONSTANTS.promoInput.class,
    ) as HTMLInputElement;
    const promoLabel = cartPrice.querySelector(
      CONSTANTS.promoLabel.class,
    ) as HTMLElement;
    const totalPriceDiscount = getDOMElement(
      TAGS.div,
      CONSTANTS.totalPriceDiscount.class,
    );
    const buyNowBtn = new Button(
      CONSTANTS.buyNowBtn.class,
      CONSTANTS.buyNowBtn.text,
    ).draw();

    let basePrice: number;

    store.subscribe(() => {
      const state: RootState = store.getState();
      basePrice = state.priceSum.price;

      productsCount.innerText = `${CONSTANTS.productsCount.text} ${state.goodsCount.count}`;
      totalPrice.innerText = `${CONSTANTS.totalPriceDiscount.text}${state.priceSum.price}`;
      totalPriceDiscount.innerText = priceCalculation(basePrice);
    });

    //инициализация стора при перерисовке страницы
    store.dispatch(initStore('store start-init'));

    title.innerText = CONSTANTS.title.text;
    promoInput.setAttribute('placeholder', CONSTANTS.promoInput.placeHolder);
    promoLabel.innerText = CONSTANTS.promoLabel.text;

    //отрисовываем блок с введенными промокодами, если их уже вводили
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.promoCodes)) {
      const currentPromoList = new PromoCodeList().draw();
      const dropBtnList = currentPromoList.querySelectorAll(
        CONSTANTS.dropPromoBtn.class,
      );

      //на все DROP кнопки вешаем лисенеры для пересчета цены
      Array.from(dropBtnList).forEach((btn) => {
        btn.addEventListener('click', () => {
          //на все DROP кнопки вешаем лисенеры для пересчета цены при добавлении новой скидки
          totalPriceDiscount.innerText = priceCalculation(basePrice);
          //на все DROP кнопки вешаем лисенеры для того чтобы появилась кнопка ADD
          promoInput.dispatchEvent(HANDLER_EVENTS.input);
          //на все кнопки DROP добавляем проверку что все скидки сняты, чтобы вернуть стиль обратно
          if (totalPriceDiscount.innerText.includes(basePrice.toString())) {
            totalPrice.classList.remove(CONSTANTS.discountApply);
            container.removeChild(totalPriceDiscount);
          }
        });
      });

      totalPrice.classList.add(CONSTANTS.discountApply);
      totalPrice.after(totalPriceDiscount);
      promoInput.before(currentPromoList);
    }

    //работаем с введенными промокодами
    promoInput.addEventListener('input', () => {
      const currentPromo = promoInput.value;
      const promoCodes = Object.keys(PROMO_CODES);
      const promoInfo = container.querySelector(CONSTANTS.resolvePromo.class);

      //удаляем в случае нажатия на кнопу DROP чтобы перерисовалось с кнопкой заново, а не дополнительным блоком
      if (promoInfo) container.removeChild(promoInfo);

      //проверяем является ли этот промокод действительным
      if (promoCodes.includes(currentPromo)) {
        const promoCodeResolve = new PromoCodeResolve(currentPromo).draw();
        const addPromoBtn = promoCodeResolve.querySelector(
          CONSTANTS.addPromoBtn.class,
        ) as HTMLButtonElement;

        //этот лисенер отвечает за обновление информации по введенным промокодам и обновление цены. "?" потому что он может ненаходить кнопку, так-как промокод уже добавили
        addPromoBtn?.addEventListener('click', () => {
          const currentPromoCodeList = document.querySelector(
            CONSTANTS.promo.class,
          );
          const newPromoCodeList = new PromoCodeList().draw();
          const dropBtnList = newPromoCodeList.querySelectorAll(
            CONSTANTS.dropPromoBtn.class,
          );

          Array.from(dropBtnList).forEach((btn) => {
            btn.addEventListener('click', () => {
              //на все DROP кнопки вешаем лисенеры для пересчета цены при добавлении новой скидки
              totalPriceDiscount.innerText = priceCalculation(basePrice);
              //на все DROP кнопки вешаем лисенеры для того чтобы появилась кнопка ADD
              promoInput.dispatchEvent(HANDLER_EVENTS.input);
              //на все кнопки DROP добавляем проверку что все скидки сняты, чтобы вернуть стиль обратно
              if (totalPriceDiscount.innerText.includes(basePrice.toString())) {
                totalPrice.classList.remove(CONSTANTS.discountApply);
                container.removeChild(totalPriceDiscount);
              }
            });
          });

          //логика добавления нового промокода
          if (currentPromoCodeList) {
            currentPromoCodeList.parentNode?.replaceChild(
              newPromoCodeList,
              currentPromoCodeList,
            );
          } else {
            promoInput.before(newPromoCodeList);
          }

          //вешаем класс для отображения что цена со скидкой и обновляем цену
          totalPrice.classList.add(CONSTANTS.discountApply);
          totalPriceDiscount.innerText = priceCalculation(basePrice);
          totalPrice.after(totalPriceDiscount);
        });

        promoInput.after(promoCodeResolve);
      } else {
        //иначе удаляем блок с промокодом
        const resolvePromo = document.querySelector(
          CONSTANTS.resolvePromo.class,
        );

        if (resolvePromo) {
          resolvePromo.parentNode?.removeChild(resolvePromo);
        }
      }
    });

    container.append(buyNowBtn);

    return cartPrice;
  }
}
