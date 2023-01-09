import './cart-page.scss';
import CONSTANTS from './constants';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import CartItems from '../../components/cart-items/CartItems';
import LocalStorage from '../../common/components/localStorage/LocalStorage';
import CartPrice from '../../components/cart-price/CartPrice';

export default class CartPage implements IDrawComponent {
  public draw(): HTMLElement {
    const localStorageData = LocalStorage.getLocalStorageData();
    const cart = getDOMElement(TAGS.div, CONSTANTS.cart.class);

    if (localStorageData.length === 0) {
      const title = getDOMElement(
        TAGS.h2,
        CONSTANTS.title.class,
        CONSTANTS.title.text,
      );

      cart.append(title);

      return cart;
    }

    const cartItems = new CartItems().draw();
    const cartPrice = new CartPrice().draw();

    cart.append(cartItems, cartPrice);

    return cart;
  }
}
