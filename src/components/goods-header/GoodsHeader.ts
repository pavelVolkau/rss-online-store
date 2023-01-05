import { Sort } from '../../common/components/sort/Sort';
import IDrawComponent from '../../common/interface/IDrawComponent';

export class GoodsHeader implements IDrawComponent {
  draw(): HTMLElement {
    const header = document.createElement('div');
    header.append(new Sort().draw());
    return header;
  }
}
