import './view.scss';
import { goTo } from '../../../router/router';
import { addQuery } from '../../helpers/addQuery';
import {
  INLINE_OPTIONS,
  QUERY_PARAMS,
  SEPARATORS,
  TAGS,
} from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { Button } from '../button/Button';
import { CONSTANTS } from './constants';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';

export class View implements IDrawComponent {
  private inline: HTMLElement;
  private table: HTMLElement;

  constructor() {
    this.inline = new Button(
      CONSTANTS.inline.class,
      CONSTANTS.inline.text,
    ).draw();
    this.table = new Button(CONSTANTS.table.class, CONSTANTS.table.text).draw();
  }

  public draw(): HTMLElement {
    const view = getDOMElement(TAGS.div, CONSTANTS.view.class);
    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const selectedView = String(
      getQueryParamSubcategories(query, QUERY_PARAMS.inline),
    );

    if (selectedView && selectedView === INLINE_OPTIONS.true) {
      this.inline.classList.add(CONSTANTS.inline.active);
    } else {
      this.table.classList.add(CONSTANTS.table.active);
    }

    [this.inline, this.table].forEach((el) => {
      const inlineOpt =
        el === this.inline ? INLINE_OPTIONS.true : INLINE_OPTIONS.false;

      el.addEventListener('click', () => {
        const link = addQuery(QUERY_PARAMS.inline, inlineOpt);

        goTo(link, true);

        this.inline.classList.toggle(CONSTANTS.inline.active);
        this.table.classList.toggle(CONSTANTS.table.active);
      });
    });

    view.append(this.inline, this.table);

    return view;
  }
}
