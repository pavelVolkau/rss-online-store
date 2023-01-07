import './filters.scss';
import { QUERY_PARAMS, ROUTES, TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { BUTTONS, CLASS } from './constants';
import { Button } from '../../common/components/button/Button';
import { goTo } from '../../router/router';
import { RangeFilter } from '../range-filter/RangeFilter';

import { PickFilter } from '../pick-filter/PickFilter';

export class Filters implements IDrawComponent {
  private categoryFilter: HTMLElement;
  private brandFilter: HTMLElement;
  private priceFilter: HTMLElement;
  private stockFilter: HTMLElement;
  private resetBtn: HTMLElement;
  private copyBtn: HTMLElement;

  constructor(totalData: Data[], currentData: Data[]) {
    // this.categoryFilter = new CategoryFilter(totalData, currentData).draw();
    // this.brandFilter = new BrandFilter(totalData, currentData).draw();
    this.priceFilter = new RangeFilter(
      totalData,
      currentData,
      QUERY_PARAMS.price,
    ).draw();
    this.stockFilter = new RangeFilter(
      totalData,
      currentData,
      QUERY_PARAMS.stock,
    ).draw();
    this.resetBtn = new Button(BUTTONS.reset.class, BUTTONS.reset.text).draw();
    this.copyBtn = new Button(BUTTONS.copy.class, BUTTONS.copy.text).draw();
    this.categoryFilter = new PickFilter(
      totalData,
      currentData,
      QUERY_PARAMS.category,
    ).draw();
    this.brandFilter = new PickFilter(
      totalData,
      currentData,
      QUERY_PARAMS.brand,
    ).draw();
  }

  public draw(): HTMLElement {
    const filters = getDOMElement(TAGS.div, CLASS);

    this.resetBtn.addEventListener('click', () => {
      goTo(ROUTES.main);
    });

    this.copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      this.copyBtn.innerText = BUTTONS.copy.copied;
      this.copyBtn.setAttribute(
        BUTTONS.copy.attr.attrName,
        BUTTONS.copy.attr.attrVal,
      );
      setTimeout(() => {
        this.copyBtn.innerText = BUTTONS.copy.text;
        this.copyBtn.removeAttribute(BUTTONS.copy.attr.attrName);
      }, 1000);
    });

    filters.append(
      this.categoryFilter,
      this.brandFilter,
      this.priceFilter,
      this.stockFilter,
      this.resetBtn,
      this.copyBtn,
    );

    return filters;
  }
}
