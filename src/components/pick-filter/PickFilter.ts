import { Checkbox } from '../../common/components/checkbox/Checkbox';
import { PickFilterWrap } from '../../common/components/pick-filter-wrap/PickFiterWrap';
import { SEPARATORS } from '../../common/helpers/constants';
import { getQueryParamSubcategories } from '../../common/helpers/getQueryParamSubcategories';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { LIST_SELECTOR } from './constants';
import { createUniqueArr } from './helpers';
import { CategoryBrand } from './types';

export class PickFilter implements IDrawComponent {
  private wrap: HTMLElement;
  private totalData: Data[];
  private currentData: Data[];
  private name: CategoryBrand;
  private title: string;

  constructor(totalData: Data[], currentData: Data[], name: CategoryBrand) {
    this.title = name[0].toUpperCase() + name.slice(1);
    this.wrap = new PickFilterWrap(this.title).draw();
    this.totalData = totalData;
    this.currentData = currentData;
    this.name = name;
  }

  public draw(): HTMLElement {
    const list = this.wrap.querySelector(LIST_SELECTOR) as HTMLElement;

    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const itemsPickedArr = getQueryParamSubcategories(query, this.name);
    const decodedArr = itemsPickedArr.map((el) => decodeURIComponent(el));

    const totalItems = this.totalData.map(
      (el) => el[this.name as keyof Data],
    ) as CategoryBrand[];

    const currentItems = this.currentData.map(
      (el) => el[this.name as keyof Data],
    ) as CategoryBrand[];

    const totalSet = createUniqueArr(totalItems);

    totalSet.forEach((el) => {
      const totalCount = totalItems.filter(
        (val) => val.toLowerCase() === el.toLowerCase(),
      );
      const currentCount = currentItems.filter(
        (val) => val.toLowerCase() === el.toLowerCase(),
      );

      let checked = false;

      if (decodedArr.includes(el.toLowerCase())) {
        checked = true;
      }

      const item = new Checkbox(
        this.name,
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
