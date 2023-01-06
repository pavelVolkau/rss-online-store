import { Checkbox } from '../../common/components/checkbox/Checkbox';
import { PickFilterWrap } from '../../common/components/pick-filter-wrap/PickFiterWrap';
import { QUERY_PARAMS, SEPARATORS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { LIST_SELECTOR, NAME } from './constants';

export class CategoryFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];
  private currentData: Data[];

  constructor(totalData: Data[], currentData: Data[]) {
    this.wrap = new PickFilterWrap(NAME).draw();
    this.totalData = totalData;
    this.currentData = currentData;
  }

  public draw(): HTMLElement {
    const totalCategories = this.totalData.map((el) => el.category);
    const totalCategoriesSet = Array.from(new Set(totalCategories));
    const currentCategories = this.currentData.map((el) => el.category);
    const list = this.wrap.querySelector(LIST_SELECTOR) as HTMLElement;
    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const itemsPickedArr = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.category,
    );

    const decodedArr = itemsPickedArr.map((el) => decodeURIComponent(el));

    totalCategoriesSet.forEach((el) => {
      const totalCount = totalCategories.filter((val) => val === el);
      const currentCount = currentCategories.filter((val) => val === el);
      let checked = false;
      if (decodedArr.includes(el.toLowerCase())) {
        checked = true;
      }
      const item = new Checkbox(
        QUERY_PARAMS.category,
        el,
        currentCount.length,
        totalCount.length,
        checked,
      ).draw();

      list.append(item);
    });

    return this.wrap;
  }
}
