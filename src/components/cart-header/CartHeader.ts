import { ROUTES, TAGS } from '../../common/helpers/constants';
import CONSTANTS from './constants';
import './cart-header.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';
import store, { RootState } from '../../common/redux/store';
import { goTo } from '../../router/router';

export default class CartHeader implements IDrawComponent {
  constructor(public goodsCount: number, public priceSum: number) {}

  public draw() {
    const cart = getDOMElement(TAGS.div, CONSTANTS.cart.class);
    const cartGoodsContainer = getDOMElement(
      TAGS.div,
      CONSTANTS.cartGoodsContainer.class,
    );
    const cartGoods = getDOMElement(TAGS.div, CONSTANTS.cartGoods.class);
    const cartPriceContainer = getDOMElement(
      TAGS.div,
      CONSTANTS.cartPriceContainer.class,
      CONSTANTS.cartPriceContainer.text,
    );
    const cartPrice = getDOMElement(TAGS.span, CONSTANTS.cartPrice.class);

    store.subscribe(() => {
      const state: RootState = store.getState();

      cartGoods.innerText = state.goodsCount.count.toString();
      cartPrice.innerText = `${
        CONSTANTS.symbol.dollar
      }${state.priceSum.price.toString()}`;
    });

    cart.addEventListener('click', () => {
      goTo(ROUTES.cart);
    });

    cartGoodsContainer.append(cartGoods);
    cartPriceContainer.append(cartPrice);
    cart.append(cartGoodsContainer, cartPriceContainer);

    return cart;
  }
}
