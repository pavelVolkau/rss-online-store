import {
  QUERY_PARAMS,
  ROUTES,
  SEPARATORS,
} from '../../common/helpers/constants';

export function createCrumbsLink(category?: string, brand?: string): string {
  const mainLink = ROUTES.main;

  if (category && !brand) {
    const categoryLink =
      mainLink +
      SEPARATORS.searchQuery +
      QUERY_PARAMS.category +
      SEPARATORS.paramsAndSubcategories +
      encodeURIComponent(category).toLowerCase();

    return categoryLink;
  }

  if (category && brand) {
    const brandLink =
      mainLink +
      SEPARATORS.searchQuery +
      QUERY_PARAMS.category +
      SEPARATORS.paramsAndSubcategories +
      encodeURIComponent(category).toLowerCase() +
      SEPARATORS.queryParams +
      QUERY_PARAMS.brand +
      SEPARATORS.paramsAndSubcategories +
      encodeURIComponent(brand).toLowerCase();

    return brandLink;
  }

  return mainLink;
}
