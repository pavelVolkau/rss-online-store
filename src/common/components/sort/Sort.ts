import './sort.scss';
import { goTo } from '../../../router/router';
import { QUERY_PARAMS, SEPARATORS, TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { ATTRIBUTES, ATTRIBUTE_SELECTED, CLASSES, TEXT } from './constants';
import { addQuery } from '../../helpers/addQuery';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';

export class Sort implements IDrawComponent {
  public draw(): HTMLElement {
    const sort = getDOMElement(TAGS.select, CLASSES.sort) as HTMLSelectElement;
    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const selectedValue = String(
      getQueryParamSubcategories(query, QUERY_PARAMS.sort),
    );

    const title = getDOMElement(
      TAGS.option,
      CLASSES.title,
      TEXT.title,
      undefined,
      ATTRIBUTES.sort,
    ) as HTMLOptionElement;

    const priceASC = getDOMElement(
      TAGS.option,
      CLASSES.priceASC,
      TEXT.priceASC,
      undefined,
      ATTRIBUTES.priceASC,
    ) as HTMLOptionElement;

    const priceDESC = getDOMElement(
      TAGS.option,
      CLASSES.priceDESC,
      TEXT.priceDESC,
      undefined,
      ATTRIBUTES.priceDESC,
    ) as HTMLOptionElement;

    const ratingASC = getDOMElement(
      TAGS.option,
      CLASSES.ratingASC,
      TEXT.ratingASC,
      undefined,
      ATTRIBUTES.ratingASC,
    ) as HTMLOptionElement;

    const ratingDESC = getDOMElement(
      TAGS.option,
      CLASSES.ratingDESC,
      TEXT.ratingDESC,
      undefined,
      ATTRIBUTES.ratingDESC,
    ) as HTMLOptionElement;

    [priceASC, priceDESC, ratingASC, ratingDESC].forEach((el) => {
      if (selectedValue === el.value) {
        title.removeAttribute(ATTRIBUTE_SELECTED);
        el.setAttribute(ATTRIBUTE_SELECTED, '');
      }
    });

    sort.addEventListener('change', () => {
      const value = sort.value;
      const link = addQuery(QUERY_PARAMS.sort, value);

      goTo(link);
    });

    sort.append(title, priceASC, priceDESC, ratingASC, ratingDESC);

    return sort;
  }
}
