export default {
  DOMtemplate: '#cart-items-template',
  minPageNumber: 1,
  minLimitNumber: 1,
  maxLimitNumber: 3,
  title: {
    class: '.cart-items__title',
    text: 'Products In Cart',
  },
  limitLabel: {
    class: '.cart-items__limit-label',
    text: 'LIMIT:',
  },
  limitInput: {
    class: '.cart-items__limit-input',
    initCount: 1,
  },
  pageInfo: {
    class: '.cart-items__page-info',
    text: 'PAGE:',
  },
  pagePrev: {
    class: 'cart-items__page-prev',
    text: '<',
  },
  currentPage: {
    class: '.cart-items__current-page',
    initCount: 1,
  },
  pageNext: {
    class: 'cart-items__page-next',
    text: '>',
  },
  itemContainer: {
    class: '.cart-items__container',
  },
};
