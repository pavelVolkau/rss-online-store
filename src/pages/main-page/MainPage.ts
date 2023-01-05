import './main-page.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Goods } from '../../components/goods/Goods';
import { CLASS } from './constants';
import { Filters } from '../../components/filters/Filters';

export class MainPage implements IDrawComponent {
  private goods: HTMLElement;
  private filters: HTMLElement;

  constructor(data: Data[], view?: boolean) {
    this.goods = new Goods(data, view).draw();
    this.filters = new Filters(data).draw();
  }

  public draw(): HTMLElement {
    const wrapper = getDOMElement(TAGS.div, CLASS);

    wrapper.append(this.filters, this.goods);

    return wrapper;
  }
}
