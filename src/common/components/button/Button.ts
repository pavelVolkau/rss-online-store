import './button.scss';
import { TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { BUTTON_CLASS } from './constants';

export class Button implements IDrawComponent {
  private readonly buttonClass: string;
  private text: string;

  constructor(buttonClass: string, text: string) {
    this.buttonClass = buttonClass;
    this.text = text;
  }

  public draw(): HTMLElement {
    const button = getDOMElement(
      TAGS.button,
      BUTTON_CLASS + this.buttonClass,
      this.text,
    );

    return button;
  }
}
