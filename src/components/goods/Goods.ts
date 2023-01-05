import './goods.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { GoodsBox } from '../goods-box/GoodsBox';
import { GoodsHeader } from '../goods-header/GoodsHeader';
import { CLASS } from './constants';

export class Goods implements IDrawComponent {
  private goodsHeader: HTMLElement;
  private goodsBox: HTMLElement;

  constructor(data: Data[], view?: boolean) {
    this.goodsHeader = new GoodsHeader(data).draw();
    this.goodsBox = new GoodsBox(data, view).draw();
  }

  draw(): HTMLElement {
    const goods = getDOMElement(TAGS.div, CLASS);

    goods.append(this.goodsHeader, this.goodsBox);

    return goods;
  }
}
