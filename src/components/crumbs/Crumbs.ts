import './crumbs.scss';
import { QUERY_PARAMS, SEPARATORS, TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { goTo } from '../../router/router';
import { Card } from '../card/Card';
import { CATEGORY_LINK, CLASSES, MAIN_LINK, TEXT } from './constants';
import { createLink } from '../../common/helpers/createLink';

export class Crumbs extends Card implements IDrawComponent {
  constructor(data: Data) {
    super(data);
  }

  public draw(): HTMLElement {
    const mainLink = MAIN_LINK;
    const categoryLink =
      CATEGORY_LINK + encodeURIComponent(this.category).toLowerCase();
    const brandLink =
      categoryLink +
      SEPARATORS.queryParams +
      QUERY_PARAMS.brand +
      SEPARATORS.paramsAndSubcategories +
      encodeURIComponent(this.brand).toLowerCase();

    const crumbs = getDOMElement(TAGS.div, CLASSES.crumbs);

    const store = getDOMElement(TAGS.a, CLASSES.store, TEXT.store, undefined, {
      href: mainLink,
    });

    const category = getDOMElement(
      TAGS.a,
      CLASSES.category,
      this.category.toUpperCase(),
      undefined,
      {
        href: categoryLink,
      },
    );

    const brand = getDOMElement(
      TAGS.a,
      CLASSES.brand,
      this.brand.toUpperCase(),
      undefined,
      {
        href: brandLink,
      },
    );

    const title = getDOMElement(
      TAGS.span,
      CLASSES.title,
      this.title.toUpperCase(),
    );

    [store, category, brand].forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLLinkElement;
        const link = createLink(target);
        goTo(link);
      });
    });

    crumbs.append(
      store,
      TEXT.arrow,
      category,
      TEXT.arrow,
      brand,
      TEXT.arrow,
      title,
    );
    return crumbs;
  }
}
