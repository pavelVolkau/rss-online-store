import { goTo } from '../../../router/router';
import { addQueryToMain } from '../../helpers/addQueryToMain';
import { QUERY_PARAMS, SEPARATORS, TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';
import IDrawComponent from '../../interface/IDrawComponent';
import { SEARCH } from './constants';

export class Search implements IDrawComponent {
  public draw(): HTMLElement {
    const searchInput = getDOMElement(
      TAGS.input,
      SEARCH.class,
      undefined,
      undefined,
      SEARCH.attributes,
    ) as HTMLInputElement;

    const query = window.location.search.split(SEPARATORS.searchQuery)[1];
    const searchedValue = getQueryParamSubcategories(
      query,
      QUERY_PARAMS.search,
    );

    const searchString = decodeURIComponent(String(searchedValue));

    if (searchString) {
      searchInput.value = searchString;
    }

    searchInput.addEventListener('input', () => {
      const value = encodeURIComponent(searchInput.value);
      const link = addQueryToMain(QUERY_PARAMS.search, value);

      goTo(link);
    });

    return searchInput;
  }
}
