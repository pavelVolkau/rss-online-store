import './cart-header.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';

export default class CartHeader implements IDrawComponent {
  constructor(public goodsCount: number, public priceSum: number) {}

  public draw() {
    const cart = getDOMElement('div', 'cart');
    const cartGoodsContainer = getDOMElement(
      'div',
      'cart__total-goods-container',
    );
    const cartGoods = getDOMElement(
      'p',
      'cart__total-goods',
      this.goodsCount.toString(),
    );
    const cartPriceContainer = getDOMElement(
      'div',
      'cart__total-price-container',
      'Cart total : ',
    );
    const cartPrice = getDOMElement(
      'span',
      'cart__total-price',
      `$${this.priceSum.toString()}`,
    );

    //после создания корзины добавить ее вызов
    //cart.addEventListener('click', () => {});

    cartGoodsContainer.append(cartGoods);
    cartPriceContainer.append(cartPrice);
    cart.append(cartGoodsContainer, cartPriceContainer);

    return cart;
  }
}
