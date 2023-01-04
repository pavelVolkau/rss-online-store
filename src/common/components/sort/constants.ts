import { SORT_OPTIONS } from '../../helpers/constants';

export const CLASSES = {
  sort: 'sort',
  title: 'sort__title',
  priceASC: 'sort__price-ASC',
  priceDESC: 'sort__price-DESC',
  ratingASC: 'sort__rating-ASC',
  ratingDESC: 'sort__rating-DESC',
};

export const TEXT = {
  title: 'Sort order',
  priceASC: 'Min price',
  priceDESC: 'Max price',
  ratingASC: 'Min rating',
  ratingDESC: 'Max rating',
};

export const ATTRIBUTES = {
  sort: {
    disabled: '',
    value: 'sort-title',
    selected: '',
  },
  priceASC: {
    value: SORT_OPTIONS.priceASC,
  },
  priceDESC: {
    value: SORT_OPTIONS.priceDESC,
  },
  ratingASC: {
    value: SORT_OPTIONS.ratingASC,
  },
  ratingDESC: {
    value: SORT_OPTIONS.ratingDESC,
  },
};

export const ATTRIBUTE_SELECTED = 'selected';
