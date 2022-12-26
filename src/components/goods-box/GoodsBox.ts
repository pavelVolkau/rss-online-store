import './goodsBox.scss';
import { Data } from '../../common/types/data';
import { Card } from '../card/Card';
import getDOMElement from '../../common/helpers/getDOMElement';
import { TAGS } from '../../common/helpers/constants';
import IDrawComponent from '../../common/interface/IDrawComponent';

export class GoodsBox implements IDrawComponent {
  private initCardsArr: Data[];
  private readonly view: boolean | undefined;

  constructor(data: Data[], view?: boolean) {
    this.initCardsArr = data;

    if (view) {
      this.view = view;
    }
  }

  public draw(): HTMLElement {
    const box: HTMLElement = getDOMElement(TAGS.div, 'goods__box');
    if (this.view) {
      box.classList.add('inline');
    }
    this.initCardsArr.forEach((element) => {
      box.appendChild(new Card(element, this.view).draw());
    });

    return box;
  }
}
