import { ROUTES } from '../../common/helpers/constants';
import { goTo } from '../../router/router';
import {
  CARD_CLASS_START,
  CARD_NUM_SEPARATOR,
  INVALID_INPUT,
  MONTH_YEAR_SEPARATOR,
  ORDER_PLACED,
  REGEXP,
} from './constants';

export function formHandler(
  popupForm: HTMLFormElement,
  nameInp: HTMLInputElement,
  phoneInp: HTMLInputElement,
  addressInp: HTMLInputElement,
  emailInp: HTMLInputElement,
  cardNumInp: HTMLInputElement,
  validInp: HTMLInputElement,
  cvvInp: HTMLInputElement,
): void {
  const nameCheck = checkField(nameInp, REGEXP.nameRegExp);
  const phoneCheck = checkField(phoneInp, REGEXP.phoneRegExp);
  const addressCheck = checkField(addressInp, REGEXP.addressRegExp);
  const emailCheck = checkField(emailInp, REGEXP.emailRegExp);
  const cardNumCheck = checkField(cardNumInp, REGEXP.cardNumRegExp);
  const validCheck = checkField(validInp, REGEXP.validInpRegExp, true);
  const cvvCheck = checkField(cvvInp, REGEXP.cvvRegExp);
  if (
    nameCheck &&
    phoneCheck &&
    addressCheck &&
    emailCheck &&
    cardNumCheck &&
    validCheck &&
    cvvCheck
  ) {
    popupForm.classList.add(ORDER_PLACED.class);
    popupForm.replaceChildren(ORDER_PLACED.text);
    setTimeout(() => {
      goTo(ROUTES.main);
    }, 3000);
  }

  return;
}

export function changeCardImg(cardImg: HTMLElement, newClass: string): void {
  const classInd = Array.from(cardImg.classList).findIndex((val) =>
    val.startsWith(CARD_CLASS_START),
  );

  cardImg.classList.replace(cardImg.classList[classInd], newClass);
}

export function checkField(
  input: HTMLInputElement,
  regExp: RegExp,
  date = false,
): boolean {
  const wrapper = input.parentElement as HTMLElement;

  if (!regExp.test(input.value)) {
    if (!input.classList.contains(INVALID_INPUT)) {
      wrapper.classList.add(INVALID_INPUT);
      input.classList.add(INVALID_INPUT);
    }
    return false;
  }

  if (date) {
    const month = input.value.slice(0, 2);

    if (Number(month) >= 12 && !input.classList.contains(INVALID_INPUT)) {
      wrapper.classList.add(INVALID_INPUT);
      input.classList.add(INVALID_INPUT);

      return false;
    }
  }
  input.classList.remove(INVALID_INPUT);
  wrapper.classList.remove(INVALID_INPUT);
  return true;
}

export function formatCardNumInput(value: string): string {
  const charsString = value.split(CARD_NUM_SEPARATOR).join('');
  const charsArr = charsString.split('');
  const charsWithoutSpaces = 4;
  const withSpaces = charsArr.reduce((acc, val, ind) => {
    const spaceOrNothing =
      (ind + 1) % charsWithoutSpaces === 0 ? CARD_NUM_SEPARATOR : '';
    return acc + val + spaceOrNothing;
  }, '');

  return withSpaces.trim();
}

export function formatValidInput(value: string): string {
  const string = value.split(MONTH_YEAR_SEPARATOR).join('');
  if (string.length > 2) {
    return string.slice(0, 2) + MONTH_YEAR_SEPARATOR + string.slice(2);
  }

  return string;
}

export function removeLetters(value: string): string {
  const string = value
    .split(CARD_NUM_SEPARATOR)
    .join('')
    .split(MONTH_YEAR_SEPARATOR)
    .join('');
  const newValue = string.replace(REGEXP.lettersRegExp, '');

  return newValue;
}
