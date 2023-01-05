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
  // private currentData: Data[];

  constructor(totalData: Data[] /* currentData: Data[] */) {
    this.wrap = new PickFilterWrap(NAME).draw();
    this.totalData = totalData;
    // this.currentData = currentData;
  }

  public draw(): HTMLElement {
    const categoriesArr = this.totalData.map((el) => el.category);
    const categoriesSet = Array.from(new Set(categoriesArr));
    const list = this.wrap.querySelector(LIST_SELECTOR) as HTMLElement;
    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const itemsPickedArr = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.category,
    );

    const decodedArr = itemsPickedArr.map((el) => decodeURIComponent(el));

    categoriesSet.forEach((el) => {
      const totalCount = categoriesArr.filter((val) => val === el);
      let checked = false;
      if (decodedArr.includes(el)) {
        checked = true;
      }
      const item = new Checkbox(
        NAME.toLowerCase(),
        el,
        0, //TODO: придумать как достать текущее значение
        totalCount.length,
        checked,
      ).draw();

      list.append(item);
    });

    return this.wrap;
  }
}
