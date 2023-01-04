import { goTo } from '../../../router/router';
import { QUERY_PARAMS, TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { ATTRIBUTES, CLASSES, TEXT } from './constants';
import { addQueryToMain } from './helpers';

export class Sort implements IDrawComponent {
  public draw(): HTMLElement {
    const sort = getDOMElement(TAGS.select, CLASSES.sort) as HTMLSelectElement;

    const title = getDOMElement(
      TAGS.option,
      CLASSES.title,
      TEXT.title,
      undefined,
      ATTRIBUTES.sort,
    );

    const priceASC = getDOMElement(
      TAGS.option,
      CLASSES.priceASC,
      TEXT.priceASC,
      undefined,
      ATTRIBUTES.priceASC,
    );

    const priceDESC = getDOMElement(
      TAGS.option,
      CLASSES.priceDESC,
      TEXT.priceDESC,
      undefined,
      ATTRIBUTES.priceDESC,
    );

    const ratingASC = getDOMElement(
      TAGS.option,
      CLASSES.ratingASC,
      TEXT.ratingASC,
      undefined,
      ATTRIBUTES.ratingASC,
    );

    const ratingDESC = getDOMElement(
      TAGS.option,
      CLASSES.ratingDESC,
      TEXT.ratingDESC,
      undefined,
      ATTRIBUTES.ratingDESC,
    );

    sort.addEventListener('change', () => {
      console.log(sort.value);
      const value = sort.value;
      const link = addQueryToMain(QUERY_PARAMS.sort, value);
      console.log('clicked');
      goTo(link);
    });

    sort.append(title, priceASC, priceDESC, ratingASC, ratingDESC);
    return sort;
  }
}
