import { RangeFilterWrap } from '../../common/components/range-filter-wrap/RangeFilterWrap';
import { Range } from '../../common/components/range/Range';
import { QUERY_PARAMS } from '../../common/helpers/constants';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { NAME } from './constants';

export class PriceFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];

  constructor(totalData: Data[]) {
    this.wrap = new RangeFilterWrap(NAME).draw();
    this.totalData = totalData;
  }

  public draw(): HTMLElement {
    const totalPriceArr = this.totalData.map((el) => el.price);

    const totalPriceMin = totalPriceArr.sort((a, b) => a - b)[0];
    const totalPriceMax = totalPriceArr.sort((a, b) => b - a)[0];

    const range = new Range(
      totalPriceMin,
      totalPriceMax,
      QUERY_PARAMS.price,
    ).draw();

    this.wrap.append(range);

    return this.wrap;
  }
}
