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

    //достаем все квери чтобы в соответствии с их наличием задавать фильтры
    const queryRange = getQueryParamSubcategories(query, this.name);
    const categoryQuery = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.category,
    );
    const brandQuery = getQueryParamSubcategories(query, QUERY_PARAMS.brand);
    const searchQuery = getQueryParamSubcategories(query, QUERY_PARAMS.search);
    //наш рэндж должен также реагировать и на второй рэндж, поэтому его тоже достаем
    const secondRange =
      this.name === QUERY_PARAMS.price
        ? getQueryParamSubcategories(query, QUERY_PARAMS.stock)
        : getQueryParamSubcategories(query, QUERY_PARAMS.price);

    const labelMin = getDOMElement(
      TAGS.label,
      CONSTANTS.min,
    ) as HTMLLabelElement;

    const labelMax = getDOMElement(
      TAGS.label,
      CONSTANTS.max,
    ) as HTMLLabelElement;

    //так как это dual slider то нам нужно два инпута, один будет отвечать за минимальный рэндж, второй за максимальный
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

    //у минимального инпута мин значение всегда будет общее минимальное значение для всех товаров (цена 10, сток 2)
    inputMin.min = String(this.min);
    //у максимального инпута макс значение всегда будет общее максимальное значение для всех товаров (цена 1749, сток 150)
    inputMax.max = String(this.max);

    //если в квери задана только цена для фильтра цены или только сток для фильтра сток, то для них выводим значения из квери
    //масимальное значение для минимального инпута = текущее значение максимального инпута и наоборот
    //т.е. value у InputMin не может быть больше чем value у InputMax
    if (
      queryRange.length === 2 &&
      categoryQuery.length === 0 &&
      brandQuery.length === 0 &&
      searchQuery.length === 0 &&
      secondRange.length === 0
    ) {
      inputMin.max = queryRange[1];
      inputMin.value = queryRange[0];

      inputMax.min = queryRange[0];
      inputMax.value = queryRange[1];
    } else {
      //если в квери заданы другие параметры, то фильтры должны на них отзываться
      //поэтому максимальное и минимальное значение задается из приходящего массива с данными
      //также оно достается из приходящего массива если ничего не задано
      inputMin.max = String(this.currentMax);
      inputMin.value = String(this.currentMin);

      inputMax.min = String(this.currentMin);
      inputMax.value = String(this.currentMax);
    }

    //здесь я задаю ширину в процентах от 100, чтобы нельзя было перетянуть один инпут через другой (в DEMO они перескакивают)
    //а у нас получается ширина не позволит его туда утянуть
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

    //листнеры на изменения а не на инпут, у меня инпут очень тяжело обрабатывается
    //можно поменять на инпут, чтобы переписовка осуществлялась по мере того как тянут тумблер этот
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
