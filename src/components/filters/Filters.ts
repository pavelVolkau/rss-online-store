import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { CategoryFilter } from '../category-filter/CategoryFilter';
import { CLASS } from './constants';

export class Filters implements IDrawComponent {
  private categoryFilter: HTMLElement;

  constructor(data: Data[]) {
    this.categoryFilter = new CategoryFilter(data).draw();
  }

  public draw(): HTMLElement {
    const filters = getDOMElement(TAGS.div, CLASS);

    filters.append(this.categoryFilter);

    return filters;
  }
}
