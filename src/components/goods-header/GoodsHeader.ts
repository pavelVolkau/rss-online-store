import './goods-header.scss';
import { FoundGoods } from '../../common/components/found-goods/FoundGoods';
import { Sort } from '../../common/components/sort/Sort';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { CLASSES } from './constants';
import { Search } from '../../common/components/search/Search';
import { View } from '../../common/components/view/View';

export class GoodsHeader implements IDrawComponent {
  private sort: HTMLElement;
  private foundGoods: HTMLElement;
  private search: HTMLElement;
  private view: HTMLElement;

  constructor(data: Data[]) {
    this.sort = new Sort().draw();
    this.foundGoods = new FoundGoods(data).draw();
    this.search = new Search().draw();
    this.view = new View().draw();
  }

  draw(): HTMLElement {
    const header = getDOMElement(TAGS.div, CLASSES.goodsHeader);

    const boc = getDOMElement(TAGS.div, CLASSES.headerWrap);

    boc.append(this.sort, this.foundGoods, this.search);

    header.append(boc, this.view);

    return header;
  }
}
