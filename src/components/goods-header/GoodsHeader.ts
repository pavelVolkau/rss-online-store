import './goods-header.scss';
import { FoundGoods } from '../../common/components/found-goods/FoundGoods';
import { Sort } from '../../common/components/sort/Sort';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { CLASS } from './constants';
import { Search } from '../../common/components/search/Search';

export class GoodsHeader implements IDrawComponent {
  private sort: HTMLElement;
  private foundGoods: HTMLElement;
  private search: HTMLElement;

  constructor(data: Data[]) {
    this.sort = new Sort().draw();
    this.foundGoods = new FoundGoods(data).draw();
    this.search = new Search().draw();
  }

  draw(): HTMLElement {
    const header = getDOMElement(TAGS.div, CLASS);

    header.append(this.sort, this.foundGoods, this.search);

    return header;
  }
}
