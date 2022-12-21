import './goodsBox.scss';
import { Card } from '../card/card';
import { Data } from '../../common/types/data';

export class GoodsBox {
  private initCardsArr: Data[];

  constructor(data: Data[]) {
    this.initCardsArr = data;
  }

  public drawBox(/* addToCart, changePage */): HTMLElement {
    const box = document.createElement('div') as HTMLElement;
    box.classList.add('goods__box');

    this.initCardsArr.forEach((element) => {
      const card: Card = new Card(element);
      const newElement: HTMLElement = card.draw(/* addToCart, changePage */);
      box.appendChild(newElement);
    });

    return box;
  }
}
