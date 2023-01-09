import { localStorageData } from '../../types/localStorageData';
import IDrawComponent from '../../interface/IDrawComponent';
import CartItem from '../cart-item/CartItem';
import getDOMElement from '../../helpers/getDOMElement';
import { TAGS } from '../../helpers/constants';
import CONSTANTS from './constants';

export default class ListGoodsCart implements IDrawComponent {
  constructor(
    private readonly arrData: localStorageData[],
    private readonly limitGoods: number,
    private readonly page: number,
  ) {}

  public draw() {
    const container = getDOMElement(TAGS.div, CONSTANTS.container.class);
    const startIndex = this.limitGoods * (this.page - 1);
    const endIndex = startIndex + this.limitGoods;
    const arrDataWithIndex = this.arrData.map((obj, index) => {
      obj.index = index + 1;
      return obj;
    });
    const arrToDraw = arrDataWithIndex.slice(startIndex, endIndex);

    arrToDraw.forEach((obj) => {
      container.append(new CartItem(obj).draw());
    });

    return container;
  }
}
