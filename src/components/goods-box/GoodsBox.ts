import './goodsBox.scss';
import { Data } from '../../common/types/data';
import { Card } from '../card/Card';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import { BOX_CLASSES, TEXT } from './constants';

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
    const box: HTMLElement = getDOMElement(TAGS.div, BOX_CLASSES.goodsBox);

    if (this.view) {
      box.classList.add(BOX_CLASSES.inline);
    }

    this.initCardsArr.forEach((element) => {
      box.appendChild(new Card(element, this.view).draw());
    });

    if (this.initCardsArr.length === 0) {
      box.append(TEXT);
      box.classList.add(BOX_CLASSES.boxEmpty);
    }

    return box;
  }
}
