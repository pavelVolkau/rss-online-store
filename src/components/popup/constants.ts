export const CONSTANTS = {
  popupOverlay: '.popup__overlay',
  popup: '.popup',
  personDetails: '.popup__person',
  cardDetails: '.popup__card',
  cardInfo: '.popup__card-info',
  cardImg: {
    class: '.popup__card-img',
    default: 'card-img_default',
    visa: 'card-img_visa',
    master: 'card-img_master',
    american: 'card-img_american',
  },
  cardOther: '.popup__card-other',
  nameInput: '.popup__name',
  phoneInput: '.popup__phone',
  addressInput: '.popup__address',
  emailInput: '.popup__email',
  cardNumInput: '.popup__card-num',
  validInput: '.popup__valid',
  cvvInput: '.popup__cvv',
  submitBtn: {
    class: 'button__submit',
    text: 'Confirm',
    type: 'submit',
  },
};

export const CARD_NUM_START = {
  visa: '4',
  master: '5',
};

export const INVALID_INPUT = 'invalid';

export const popupTemplateSelector = '#popup-template';

export const REGEXP = {
  nameRegExp: /[A-Za-z]{3,}\s[A-Za-z]{3,}/,
  phoneRegExp: /\+[0-9]{9,}/,
  addressRegExp: /\w{5,}\s\w{5,}\s\w{5,}/,
  emailRegExp: /[A-Za-z]+@[a-z]+\.[a-z]+/,
  cardNumRegExp: /[0-9]{4}\t[0-9]{4}\t[0-9]{4}\t[0-9]{4}/,
  validInpRegExp: /[0-1][0-9]\/[0-9]{2}/,
  cvvRegExp: /[0-9]{3}/,
  lettersRegExp: /[^\d]/g,
};

export const CARD_NUM_SEPARATOR = '\t';
export const MONTH_YEAR_SEPARATOR = '/';
export const CARD_CLASS_START = 'card-img_';
export const ORDER_PLACED = {
  class: 'placed',
  text: 'Your order was placed! You will be redirected to main page',
};
