import { QUERY_PARAMS, SEPARATORS } from '../../helpers/constants';
import { getQueryParamSubcategories } from '../../helpers/getQueryParamSubcategories';

export function getSelectedValue(): string {
  const locationSearch = window.location.search;

  if (!locationSearch) {
    return '';
  }

  const query = locationSearch.split(SEPARATORS.searchQuery)[1];
  const valueSelected = getQueryParamSubcategories(query, QUERY_PARAMS.sort);

  return String(valueSelected);
}
