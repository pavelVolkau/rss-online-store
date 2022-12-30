export const CARD_TEMPLATE_DEFAULT = document.querySelector(
  '#card-template',
) as HTMLTemplateElement;

export const CARD_TEMPLATE_INLINE = document.querySelector(
  '#card-template-inline',
) as HTMLTemplateElement;

export const TITLE_LENGTH = 20;

export const CARD_CLASSES = {
  title: '.card__title',
  img: '.card__img',
  category: '.card__category',
  brand: '.card__brand',
  price: '.card__price',
  discount: '.card__discount',
  rating: '.card__rating',
  stock: '.card__stock',
};

export const SYMBOLS = {
  dots: '...',
  minus: '-',
  percent: '%',
  dollar: '$',
};

export const CAPTIONS = {
  category: 'Category: ',
  brand: 'Brand: ',
  left: 'left: ',
};
