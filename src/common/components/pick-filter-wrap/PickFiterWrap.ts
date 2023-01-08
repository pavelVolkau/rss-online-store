import './pick-filter-wrap.scss';
import { TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { CLASSES } from './constants';

export class PickFilterWrap implements IDrawComponent {
  private titleText: string;

  constructor(titleText: string) {
    this.titleText = titleText;
  }

  public draw(): HTMLElement {
    const wrap = getDOMElement(TAGS.div, CLASSES.wrap);
    const title = getDOMElement(TAGS.p, CLASSES.title, this.titleText);
    const list = getDOMElement(TAGS.ul, CLASSES.items);

    wrap.append(title, list);

    return wrap;
  }
}
