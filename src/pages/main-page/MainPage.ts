import './main-page.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Goods } from '../../components/goods/Goods';
import { CLASSES } from './constants';
import { Filters } from '../../components/filters/Filters';

export class MainPage implements IDrawComponent {
  private goods: HTMLElement;
  private filters: HTMLElement;

  constructor(totalData: Data[], currentData: Data[], view?: boolean) {
    this.goods = new Goods(currentData, view).draw();
    this.filters = new Filters(totalData, currentData).draw();
  }

  public draw(): HTMLElement {
    const wrapper = getDOMElement(TAGS.div, CLASSES.mainWrap);
    const filtersWrap = getDOMElement(TAGS.div, CLASSES.filtersWrap);

    filtersWrap.append(this.filters);
    wrapper.append(filtersWrap, this.goods);

    return wrapper;
  }
}
