export const TAGS = {
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  span: 'span',
  a: 'a',
  ul: 'ul',
  li: 'li',
  input: 'input',
  label: 'label',
  button: 'button',
  img: 'img',
  header: 'header',
  main: 'main',
  footer: 'footer',
};

export const INPUT_TYPE = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  date: 'date',
  datetime: 'datetime',
  month: 'month',
  week: 'week',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  text: 'text',
  url: 'url',
};

export const APP_ROOT = document.querySelector('.app-root') as HTMLElement;

export const SEPARATORS = {
  searchQuery: '?',
  path: '/',
  queryParams: '&',
  paramsAndSubcategories: '=',
  subcategory: '%',
  words: ' ',
};

export const INLINE_OPTIONS = {
  true: 'true',
  false: 'false',
};

export const ROUTES = {
  main: '/', //route для главной страницы
  details: '/#details', //route для страницы деталей
  cart: '/#cart', //route для корзины
};

export const LINK = 'https://dummyjson.com/products?limit=100';

export const SORT_OPTIONS = {
  priceASC: 'price-ASC',
  priceDESC: 'price-DESC',
  ratingASC: 'rating-ASC',
  ratingDESC: 'rating-DESC',
};

export const QUERY_PARAMS = {
  category: 'category',
  brand: 'brand',
  price: 'price',
  stock: 'stock',
  sort: 'sort',
  search: 'search',
  inline: 'inline',
};
