import { RangeFilterWrap } from '../../common/components/range-filter-wrap/RangeFilterWrap';
import { Range } from '../../common/components/range/Range';
import { QUERY_PARAMS, SYMBOLS, TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { NAME, NOT_FOUND, SELECTORS } from './constants';

export class PriceFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];
  private currentData: Data[];

  constructor(totalData: Data[], currentData: Data[]) {
    this.wrap = new RangeFilterWrap(NAME).draw();
    this.totalData = totalData;
    this.currentData = currentData;
  }

  public draw(): HTMLElement {
    const notFound = getDOMElement(TAGS.div, NOT_FOUND.class, NOT_FOUND.text);

    if (this.currentData.length === 0) {
      this.wrap.append(notFound);
      return this.wrap;
    }

    const totalPriceArr = this.totalData.map((el) => el.price);
    const currentPriceArr = this.currentData.map((el) => el.price);

    const totalPriceMin = totalPriceArr.sort((a, b) => a - b)[0];
    const totalPriceMax = totalPriceArr.sort((a, b) => b - a)[0];

    const currentPriceMin = currentPriceArr.sort((a, b) => a - b)[0];
    const currentPriceMax = currentPriceArr.sort((a, b) => b - a)[0];

    const range = new Range(
      totalPriceMin,
      totalPriceMax,
      QUERY_PARAMS.price,
      currentPriceMin,
      currentPriceMax,
    ).draw();

    const labelMin = range.querySelector(SELECTORS.labelMin) as HTMLElement;
    const labelMax = range.querySelector(SELECTORS.labelMax) as HTMLElement;

    labelMin.prepend(SYMBOLS.dollar);
    labelMax.prepend(SYMBOLS.dollar);

    this.wrap.append(range);

    return this.wrap;
  }
}
