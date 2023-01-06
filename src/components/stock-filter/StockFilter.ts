import { RangeFilterWrap } from '../../common/components/range-filter-wrap/RangeFilterWrap';
import { Range } from '../../common/components/range/Range';
import { QUERY_PARAMS, TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { NAME, NOT_FOUND } from './constants';

export class StockFilter implements IDrawComponent {
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

    const totalStockArr = this.totalData.map((el) => el.stock);
    const currentStockArr = this.currentData.map((el) => el.stock);

    const totalStockMin = totalStockArr.sort((a, b) => a - b)[0];
    const totalStockMax = totalStockArr.sort((a, b) => b - a)[0];

    const currentStockMin = currentStockArr.sort((a, b) => a - b)[0];
    const currentStockMax = currentStockArr.sort((a, b) => b - a)[0];

    const range = new Range(
      totalStockMin,
      totalStockMax,
      QUERY_PARAMS.stock,
      currentStockMin,
      currentStockMax,
    ).draw();

    this.wrap.append(range);

    return this.wrap;
  }
}
