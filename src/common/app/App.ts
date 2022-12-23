import Header from '../../components/header/Header';

export default class App {
  private header = new Header().draw() as HTMLElement;

  start(): void {
    const appRoot = document.querySelector('.app-root') as HTMLElement;

    appRoot.append(this.header);
  }
}

// DATA LOADER
// import { Data } from './common/types/data';
// import { DataLoader } from './components/data-loader/dataLoader';

// const link = 'https://dummyjson.com/products?limit=100';
// const loader = new DataLoader(link);
// loader.getData((data: Data[]) => console.log(data));
