import { Checkbox } from '../../common/components/checkbox/Checkbox';
import { PickFilterWrap } from '../../common/components/pick-filter-wrap/PickFiterWrap';
import { QUERY_PARAMS, SEPARATORS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { LIST_SELECTOR, NAME } from './constants';
import { createUniqueArr } from './helpers';

export class BrandFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];
  private currentData: Data[];

  constructor(totalData: Data[], currentData: Data[]) {
    this.wrap = new PickFilterWrap(NAME).draw();
    this.totalData = totalData;
    this.currentData = currentData;
  }

  public draw(): HTMLElement {
    const totalBrands = this.totalData.map((el) => el.brand);
    const totalBrandsSet = createUniqueArr(totalBrands);
    const currentBrands = this.currentData.map((el) => el.brand);

    const list = this.wrap.querySelector(LIST_SELECTOR) as HTMLElement;
    const query = window.location.search.split(SEPARATORS.searchQuery)[1];

    const itemsPickedArr = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.brand,
    );

    const decodedArr = itemsPickedArr.map((el) => decodeURIComponent(el));

    totalBrandsSet.forEach((el) => {
      const totalCount = totalBrands.filter(
        (val) => val.toLowerCase() === el.toLowerCase(),
      );
      const currentCount = currentBrands.filter(
        (val) => val.toLowerCase() === el.toLowerCase(),
      );
      let checked = false;

      if (decodedArr.includes(el.toLowerCase())) {
        checked = true;
      }

      const item = new Checkbox(
        QUERY_PARAMS.brand,
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
