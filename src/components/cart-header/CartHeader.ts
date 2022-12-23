import { TAGS } from '../../common/helpers/constants';
import './cart-header.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';
import store, { RootState } from '../../common/redux/store';

const CONSTANTS = {
  cart: {
    class: 'cart',
  },
  cartGoodsContainer: {
    class: 'cart__total-goods-container',
  },
  cartGoods: {
    class: 'cart__total-goods',
  },
  cartPriceContainer: {
    class: 'cart__total-price-container',
    text: 'Cart total : ',
  },
  cartPrice: {
    class: 'cart__total-price',
  },
  symbol: {
    $: '$',
  },
};

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
        CONSTANTS.symbol.$
      }${state.priceSum.price.toString()}`;
    });

    //TODO добавить cart.addEventListener('click', () => {}); для открытия старницы оплаты(корзины)

    cartGoodsContainer.append(cartGoods);
    cartPriceContainer.append(cartPrice);
    cart.append(cartGoodsContainer, cartPriceContainer);

    return cart;
  }
}
