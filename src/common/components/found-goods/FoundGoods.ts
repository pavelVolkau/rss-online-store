import { TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { Data } from '../../types/data';
import { CLASSES, TEXT } from './constants';

export class FoundGoods implements IDrawComponent {
  private readonly data: Data[];

  constructor(data: Data[]) {
    this.data = data;
  }

  public draw(): HTMLElement {
    const foundBox = getDOMElement(TAGS.div, CLASSES.foundBox, TEXT);
    const foundAmount = getDOMElement(TAGS.span, CLASSES.foundAmount);

    foundAmount.innerText = String(this.data.length);

    foundBox.append(foundAmount);

    return foundBox;
  }
}
