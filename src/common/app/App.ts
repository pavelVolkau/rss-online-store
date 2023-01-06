import './app.scss';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { initRouter } from '../../router/router';
import getDOMElement from '../helpers/getDOMElement';
import { TAGS } from '../helpers/constants';
import CONSTANTS from './constants';
import Cart from '../../components/cart/Cart';

export default class App {
  private header = new Header().draw() as HTMLElement;
  private footer = new Footer().draw() as HTMLElement;

  start(): void {
    const BODY = document.body;
    const main = getDOMElement(TAGS.main, CONSTANTS.main.class);
    const appRoot = getDOMElement(TAGS.div, CONSTANTS.appRoot.class);

    appRoot.append(new Cart().draw());
    main.append(appRoot);

    BODY.append(this.header, main, this.footer);

    initRouter();
  }
}
