import './goodsBox.scss';
import { Data } from '../../common/types/data';
import { Card } from '../card/Card';
import getDOMElement from '../../common/helpers/getDOMElement';
import { TAGS } from '../../common/helpers/constants';
// import IDrawComponent from '../../common/interface/IDrawComponent';

export class GoodsBox /*implements IDrawComponent*/ {
  private initCardsArr: Data[];

  constructor(data: Data[]) {
    this.initCardsArr = data;
  }

  public draw(view?: boolean): HTMLElement {
    const box: HTMLElement = getDOMElement(TAGS.div, 'goods__box');
    if (view) {
      box.classList.add('inline');
    }
    this.initCardsArr.forEach((element) => {
      box.appendChild(new Card(element).draw(view));
    });

    return box;
  }
}
