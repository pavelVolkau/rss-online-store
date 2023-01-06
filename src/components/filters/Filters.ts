import './filters.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { CategoryFilter } from '../category-filter/CategoryFilter';
import { CLASS } from './constants';
import { BrandFilter } from '../brand-filter/BrandFilter';

export class Filters implements IDrawComponent {
  private categoryFilter: HTMLElement;
  private brandFilter: HTMLElement;

  constructor(totalData: Data[], currentData: Data[]) {
    this.categoryFilter = new CategoryFilter(totalData, currentData).draw();
    this.brandFilter = new BrandFilter(totalData, currentData).draw();
  }

  public draw(): HTMLElement {
    const filters = getDOMElement(TAGS.div, CLASS);

    filters.append(this.categoryFilter, this.brandFilter);

    return filters;
  }
}
