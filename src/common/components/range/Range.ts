import './range.scss';
import {
  TAGS,
  SYMBOLS,
  SEPARATORS,
  QUERY_PARAMS,
} from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { CONSTANTS } from './constants';
import { goTo } from '../../../router/router';
import { addQuery } from '../../helpers/addQuery';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';

export class Range implements IDrawComponent {
  private min: number;
  private max: number;
  private name: string;
  private currentMin: number;
  private currentMax: number;

  constructor(
    min: number,
    max: number,
    name: string,
    currentMin: number,
    currentMax: number,
  ) {
    this.min = min;
    this.max = max;
    this.name = name;
    this.currentMin = currentMin;
    this.currentMax = currentMax;
  }

  public draw(): HTMLElement {
    const rangeContainer = getDOMElement(TAGS.div, CONSTANTS.range);
    const labelContainer = getDOMElement(TAGS.div, CONSTANTS.labels);
    const inputContainer = getDOMElement(TAGS.div, CONSTANTS.inputs);

    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const queryRange = getQueryParamSubcategories(query, this.name);
    const categoryQuery = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.category,
    );
    const brandQuery = getQueryParamSubcategories(query, QUERY_PARAMS.brand);
    const searchQuery = getQueryParamSubcategories(query, QUERY_PARAMS.search);

    const labelMin = getDOMElement(
      TAGS.label,
      CONSTANTS.min,
    ) as HTMLLabelElement;

    const labelMax = getDOMElement(
      TAGS.label,
      CONSTANTS.max,
    ) as HTMLLabelElement;

    const inputMin = getDOMElement(
      TAGS.input,
      CONSTANTS.input.class,
      undefined,
      this.name + CONSTANTS.input.id.min,
      CONSTANTS.input.attributes,
    ) as HTMLInputElement;

    const inputMax = getDOMElement(
      TAGS.input,
      CONSTANTS.input.class,
      undefined,
      this.name + CONSTANTS.input.id.max,
      CONSTANTS.input.attributes,
    ) as HTMLInputElement;

    inputMin.min = String(this.min);
    inputMax.max = String(this.max);

    if (
      queryRange.length === 2 &&
      categoryQuery.length === 0 &&
      brandQuery.length === 0 &&
      searchQuery.length === 0
    ) {
      inputMin.max = queryRange[1];
      inputMin.value = queryRange[0];

      inputMax.min = queryRange[0];
      inputMax.value = queryRange[1];
    } else {
      inputMin.max = String(this.currentMax);
      inputMin.value = String(this.currentMin);

      inputMax.min = String(this.currentMin);
      inputMax.value = String(this.currentMax);
    }

    const totalInpWidth = this.max - this.min;
    const minInpWidth =
      ((Number(inputMin.max) - this.min) * 100) / totalInpWidth;
    const maxInpWidth =
      ((this.max - Number(inputMax.min)) * 100) / totalInpWidth;

    inputMin.style.width = `${minInpWidth}${SYMBOLS.percent}`;
    inputMax.style.width = `${maxInpWidth}${SYMBOLS.percent}`;

    labelMin.htmlFor = inputMin.id;
    labelMin.innerText = inputMin.value;

    labelMax.htmlFor = inputMax.id;
    labelMax.innerText = inputMax.value;

    [inputMin, inputMax].forEach((el) => {
      el.addEventListener('change', () => {
        const subcategory =
          inputMin.value + SEPARATORS.subcategory + inputMax.value;
        const link = addQuery(this.name, subcategory);
        goTo(link);
      });
    });

    labelContainer.append(labelMin, labelMax);
    inputContainer.append(inputMin, inputMax);

    rangeContainer.append(labelContainer, inputContainer);

    return rangeContainer;
  }
}
