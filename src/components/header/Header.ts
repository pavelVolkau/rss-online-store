import { TAGS } from '../../common/helpers/constants';
import CONSTANTS from './constants';
import './header.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';
import Logo from '../logo/Logo';
import CartHeader from '../cart-header/CartHeader';

export default class Header implements IDrawComponent {
  public draw() {
    const header = getDOMElement(TAGS.header, CONSTANTS.header.class);
    const logo = new Logo();
    const cartHeader = new CartHeader(0, 0); // add local storage

    header.append(logo.draw(), cartHeader.draw());

    return header;
  }
}
