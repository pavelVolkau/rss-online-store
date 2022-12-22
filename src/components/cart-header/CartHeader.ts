import { TAGS } from '../../common/helpers/constants';
import './cart-header.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';

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
    const cartGoods = getDOMElement(
      TAGS.div,
      CONSTANTS.cartGoods.class,
      this.goodsCount.toString(),
    );
    const cartPriceContainer = getDOMElement(
      TAGS.div,
      CONSTANTS.cartPriceContainer.class,
      CONSTANTS.cartPriceContainer.text,
    );
    const cartPrice = getDOMElement(
      TAGS.span,
      CONSTANTS.cartPrice.class,
      `${CONSTANTS.symbol.$}${this.priceSum.toString()}`,
    );

    //после создания корзины добавить ее вызов
    //cart.addEventListener('click', () => {});

    cartGoodsContainer.append(cartGoods);
    cartPriceContainer.append(cartPrice);
    cart.append(cartGoodsContainer, cartPriceContainer);

    return cart;
  }
}
