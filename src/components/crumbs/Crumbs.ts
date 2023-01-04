import './crumbs.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { goTo } from '../../router/router';
import { Card } from '../card/Card';
import { CLASSES, TEXT } from './constants';
import { createLink } from '../../common/helpers/createLink';
import { createCrumbsLink } from './helpers';

export class Crumbs extends Card implements IDrawComponent {
  constructor(data: Data) {
    super(data);
  }

  public draw(): HTMLElement {
    const crumbs = getDOMElement(TAGS.div, CLASSES.crumbs);

    const store = getDOMElement(TAGS.a, CLASSES.store, TEXT.store, undefined, {
      href: createCrumbsLink(),
    });

    const category = getDOMElement(
      TAGS.a,
      CLASSES.category,
      this.category.toUpperCase(),
      undefined,
      {
        href: createCrumbsLink(this.category),
      },
    );

    const brand = getDOMElement(
      TAGS.a,
      CLASSES.brand,
      this.brand.toUpperCase(),
      undefined,
      {
        href: createCrumbsLink(this.category, this.brand),
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
