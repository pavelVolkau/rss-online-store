import './header.scss';
import { IDrawComponent } from '../../common/interface/IDrawComponent';

export default class Header implements IDrawComponent {
  public draw() {
    const headerTemplate = document.querySelector(
      '#header-template',
    ) as HTMLTemplateElement;
    const headerClone = headerTemplate.content.cloneNode(true) as HTMLElement;
    //const cart = headerClone.querySelector('.header__cart') as HTMLElement;

    //после создания корзины добавить ее вызов
    //cart.addEventListener('click', () => {});

    return headerClone;
  }
}
