import './app.scss';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { initRouter } from '../../router/router';
import getDOMElement from '../helpers/getDOMElement';
import { TAGS } from '../helpers/constants';
import CONSTANTS from './constants';
// import { LINK } from '../helpers/constants';
// import { Data } from '../types/data';

// const loader = new DataLoader(LINK);

export default class App {
  private header = new Header().draw() as HTMLElement;
  private footer = new Footer().draw() as HTMLElement;

  start(): void {
    const BODY = document.body;
    const main = getDOMElement(TAGS.main, CONSTANTS.main.class);
    const appRoot = getDOMElement(TAGS.div, CONSTANTS.appRoot.class);

    main.append(appRoot);

    BODY.append(this.header, main, this.footer);
    initRouter();
  }
}

// DATA LOADER
// import { Data } from './common/types/data';
// import { DataLoader } from './components/data-loader/dataLoader';

// const link = 'https://dummyjson.com/products?limit=100';
// const loader = new DataLoader(link);
// loader.getData((data: Data[]) => console.log(data));
