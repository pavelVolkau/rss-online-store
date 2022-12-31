import './cart.scss';
import CONSTANTS from './constants';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import LocalStorage from '../../common/components/localStorage/LocalStorage';

export default class Cart implements IDrawComponent {
  public draw(): HTMLElement {
    const localStorageData = LocalStorage.getLocalStorageData();
    const cart = getDOMElement(TAGS.div, CONSTANTS.cart.class);

    if (!localStorageData) {
      const title = getDOMElement(
        TAGS.h2,
        CONSTANTS.title.class,
        CONSTANTS.title.text,
      );

      cart.append(title);

      return cart;
    }

    // TODO: вызвать 2 класса и заапендить в cart

    return cart;
  }
}
