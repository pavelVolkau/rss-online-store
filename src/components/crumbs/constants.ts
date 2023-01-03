import {
  QUERY_PARAMS,
  ROUTES,
  SEPARATORS,
} from '../../common/helpers/constants';

export const CLASSES = {
  crumbs: 'crumbs',
  store: 'crumbs__store',
  category: 'crumbs__category',
  brand: 'crumbs__brand',
  title: 'crumbs__title',
};

export const MAIN_LINK = ROUTES.main;

export const CATEGORY_LINK =
  MAIN_LINK +
  SEPARATORS.searchQuery +
  QUERY_PARAMS.category +
  SEPARATORS.paramsAndSubcategories;

export const TEXT = {
  store: 'STORE',
  arrow: '->',
};
