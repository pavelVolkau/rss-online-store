import './range.scss';
import {
  TAGS,
  SYMBOLS,
  SEPARATORS,
  QUERY_PARAMS,
} from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { CONSTANTS, NOT_FOUND } from './constants';
import { goTo } from '../../../router/router';
import { addQuery } from '../../helpers/addQuery';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';
import { setInputWidth, setMinMax } from './helpers';

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
    inputMin.max = String(this.max);
    //у максимального инпута макс значение всегда будет общее максимальное значение для всех товаров (цена 1749, сток 150)
    inputMax.max = String(this.max);
    inputMax.min = String(this.min);

    //если в квери задана только цена для фильтра цены или только сток для фильтра сток, то для них выводим значения из квери
    if (this.currentMin !== Infinity && this.currentMax !== -Infinity) {
      if (
        queryRange.length === 2 &&
        categoryQuery.length === 0 &&
        brandQuery.length === 0 &&
        searchQuery.length === 0 &&
        secondRange.length === 0
      ) {
        inputMin.value = queryRange[0];
        inputMax.value = queryRange[1];
      } else {
        //если в квери заданы другие параметры, то фильтры должны на них отзываться
        //поэтому максимальное и минимальное значение задается из приходящего массива с данными
        //также оно достается из приходящего массива если ничего не задано
        inputMin.value = String(this.currentMin);
        inputMax.value = String(this.currentMax);
      }

      //меняем дефолтный min для inputMax и max для inputMin
      setMinMax(inputMin, inputMax);

      //здесь я задаю ширину в процентах от 100, чтобы нельзя было перетянуть один инпут через другой (в DEMO они перескакивают)
      //а у нас получается ширина не позволит его туда утянуть
      setInputWidth(this.min, this.max, inputMin, inputMax);

      labelMin.htmlFor = inputMin.id;
      labelMin.innerText = inputMin.value;

      labelMax.htmlFor = inputMax.id;
      labelMax.innerText = inputMax.value;

      labelContainer.append(labelMin, labelMax);
    }

    if (this.currentMin === Infinity && this.currentMax === -Infinity) {
      const notFound = getDOMElement(
        TAGS.span,
        NOT_FOUND.class,
        NOT_FOUND.text,
      );

      labelContainer.replaceChildren(notFound);

      inputMin.max = String(this.max);
      inputMin.value = String(this.min);

      inputMax.min = String(this.min);
      inputMax.value = String(this.max);
    }

    //листнеры на изменения а не на инпут, у меня инпут очень тяжело обрабатывается
    //можно поменять на инпут, чтобы переписовка осуществлялась по мере того как тянут тумблер этот
    [inputMin, inputMax].forEach((el) => {
      el.addEventListener('change', () => {
        labelMin.innerText = inputMin.value;
        labelMax.innerText = inputMax.value;

        if (this.name === QUERY_PARAMS.price) {
          labelMin.prepend(SYMBOLS.dollar);
          labelMax.prepend(SYMBOLS.dollar);
        }

        setMinMax(inputMin, inputMax);
        setInputWidth(this.min, this.max, inputMin, inputMax);

        const subcategory =
          inputMin.value + SEPARATORS.subcategory + inputMax.value;
        const link = addQuery(this.name, subcategory);
        const secondRangeName =
          this.name === QUERY_PARAMS.price
            ? QUERY_PARAMS.stock
            : QUERY_PARAMS.price;

        goTo(link, true, secondRangeName);
      });
    });

    inputContainer.append(inputMin, inputMax);
    rangeContainer.append(labelContainer, inputContainer);

    return rangeContainer;
  }
}
