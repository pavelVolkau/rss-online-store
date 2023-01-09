import { RangeFilterWrap } from '../../common/components/range-filter-wrap/RangeFilterWrap';
import { Range } from '../../common/components/range/Range';
import { QUERY_PARAMS, SYMBOLS } from '../../common/helpers/constants';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { SELECTORS } from './constants';
import { DataPriceStock } from './types';

export class RangeFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];
  private currentData: Data[];
  private name: string;
  private title: string;

  constructor(totalData: Data[], currentData: Data[], name: string) {
    this.title = name[0].toUpperCase() + name.slice(1);
    this.wrap = new RangeFilterWrap(this.title).draw();
    this.totalData = totalData;
    this.currentData = currentData;
    this.name = name;
  }

  public draw(): HTMLElement {
    const totalArr = this.totalData.map(
      (el) => el[this.name as keyof Data],
    ) as DataPriceStock;
    const currentArr = this.currentData.map(
      (el) => el[this.name as keyof Data],
    ) as DataPriceStock;

    const totalMin = Math.min(...totalArr);
    const totalMax = Math.max(...totalArr);

    const currentMin = Math.min(...currentArr);
    const currentMax = Math.max(...currentArr);

    const range = new Range(
      totalMin,
      totalMax,
      this.name,
      currentMin,
      currentMax,
    ).draw();

    if (this.name === QUERY_PARAMS.price && this.currentData.length > 0) {
      const labelMin = range.querySelector(SELECTORS.labelMin) as HTMLElement;
      const labelMax = range.querySelector(SELECTORS.labelMax) as HTMLElement;

      labelMin.prepend(SYMBOLS.dollar);
      labelMax.prepend(SYMBOLS.dollar);
    }

    this.wrap.append(range);

    return this.wrap;
  }
}
