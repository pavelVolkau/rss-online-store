import './checkbox.scss';
import { goTo } from '../../../router/router';
import { addQuery } from '../../helpers/addQuery';
import { TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { CONSTANTS } from './constants';

export class Checkbox implements IDrawComponent {
  private name: string;
  private value: string;
  private currentCount: number;
  private totalCount: number;
  private checked: boolean;

  constructor(
    name: string,
    value: string,
    currentCount: number,
    totalCount: number,
    checked = false,
  ) {
    this.name = name;
    this.value = value;
    this.currentCount = currentCount;
    this.totalCount = totalCount;
    this.checked = checked;
  }

  public draw(): HTMLElement {
    const filterItem = getDOMElement(TAGS.li, CONSTANTS.filterItem);
    const filterBox = getDOMElement(TAGS.div, CONSTANTS.filterBox);
    const filterCount = getDOMElement(TAGS.div, CONSTANTS.filterCount.class);

    const input = getDOMElement(
      TAGS.input,
      CONSTANTS.input.class,
      undefined,
      this.value,
      CONSTANTS.input.attributes,
    ) as HTMLInputElement;

    input.name = this.name;
    input.value = this.value;

    if (this.checked) {
      input.setAttribute(
        CONSTANTS.input.checked.attrName,
        CONSTANTS.input.checked.attrVal,
      );
      filterItem.classList.add('checked');
    }

    input.addEventListener('change', () => {
      const subcategory = encodeURIComponent(this.value.toLowerCase());
      let link = '';
      console.log(link);
      if (this.checked) {
        link = addQuery(this.name, subcategory, true);
      } else {
        link = addQuery(this.name, subcategory);
      }
      goTo(link);
    });

    const label = getDOMElement(
      TAGS.label,
      CONSTANTS.label,
      this.value,
    ) as HTMLLabelElement;

    label.htmlFor = input.id;

    filterBox.append(input, label);

    const curentCount = getDOMElement(
      TAGS.span,
      CONSTANTS.curentCount,
      String(this.currentCount),
    );

    const totalCount = getDOMElement(
      TAGS.span,
      CONSTANTS.totalCount,
      String(this.totalCount),
    );

    filterCount.append(
      curentCount,
      CONSTANTS.filterCount.separator,
      totalCount,
    );

    filterItem.append(filterBox, filterCount);

    return filterItem;
  }
}
