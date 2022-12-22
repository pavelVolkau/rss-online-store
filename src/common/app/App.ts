import Header from '../../components/header/Header';

export default class App {
  private header = new Header().draw() as HTMLElement;

  start(): void {
    const appRoot = document.querySelector('.app-root') as HTMLElement;

    appRoot.append(this.header);
  }
}
