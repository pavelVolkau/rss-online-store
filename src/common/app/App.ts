import './app-root.scss';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { initRouter } from '../../router/router';
// import { LINK } from '../helpers/constants';
// import { Data } from '../types/data';

// const loader = new DataLoader(LINK);

export default class App {
  private header = new Header().draw() as HTMLElement;
  private footer = new Footer().draw() as HTMLElement;

  start(): void {
    initRouter();
    const appRoot = document.querySelector('.app-root') as HTMLElement;

    appRoot.append(this.header, this.footer);
  }
}

// DATA LOADER
// import { Data } from './common/types/data';
// import { DataLoader } from './components/data-loader/dataLoader';

// const link = 'https://dummyjson.com/products?limit=100';
// const loader = new DataLoader(link);
// loader.getData((data: Data[]) => console.log(data));
