import './range-filter-wrap.scss';
import { TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { CLASSES } from './constants';

export class RangeFilterWrap implements IDrawComponent {
  private titleText: string;

  constructor(titleText: string) {
    this.titleText = titleText;
  }

  public draw(): HTMLElement {
    const wrap = getDOMElement(
      TAGS.div,
      `${CLASSES.wrap} ${this.titleText.toLowerCase()}`,
    );
    const title = getDOMElement(TAGS.p, CLASSES.title, this.titleText);

    wrap.append(title);

    return wrap;
  }
}
