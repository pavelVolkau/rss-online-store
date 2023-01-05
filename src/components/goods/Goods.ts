import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { GoodsBox } from '../goods-box/GoodsBox';
import { GoodsHeader } from '../goods-header/GoodsHeader';

export class Goods implements IDrawComponent {
  private data: Data[];
  private view: boolean | undefined;

  constructor(data: Data[], view?: boolean) {
    this.data = data;
    this.view = view;
  }

  draw(): HTMLElement {
    const goods = document.createElement('div');
    goods.append(
      new GoodsHeader().draw(),
      new GoodsBox(this.data, this.view).draw(),
    );
    return goods;
  }
}
