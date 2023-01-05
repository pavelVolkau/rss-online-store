import './view.scss';
import { goTo } from '../../../router/router';
import { addQueryToMain } from '../../helpers/addQueryToMain';
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

    this.inline.addEventListener('click', () => {
      const link = addQueryToMain(QUERY_PARAMS.inline, INLINE_OPTIONS.true);

      goTo(link);
    });

    this.table.addEventListener('click', () => {
      const link = addQueryToMain(QUERY_PARAMS.inline, INLINE_OPTIONS.false);

      goTo(link);
    });

    view.append(this.inline, this.table);

    return view;
  }
}
