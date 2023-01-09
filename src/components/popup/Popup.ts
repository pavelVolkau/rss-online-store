import './popup.scss';
// import { TAGS } from '../../common/helpers/constants';
// import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import {
  CARD_NUM_START,
  CONSTANTS,
  popupTemplateSelector,
  REGEXP,
} from './constants';
import {
  changeCardImg,
  checkField,
  formatCardNumInput,
  formatValidInput,
  formHandler,
  removeLetters,
} from './helpers';
import { Button } from '../../common/components/button/Button';
import { APP_ROOT_CLASS } from '../../common/helpers/constants';

export class Popup implements IDrawComponent {
  public draw(): HTMLElement {
    const popupTemplate = document.querySelector(
      popupTemplateSelector,
    ) as HTMLTemplateElement;
    const popupClone = popupTemplate.content.cloneNode(true) as HTMLElement;
    const popupOverlay = popupClone.querySelector(
      CONSTANTS.popupOverlay,
    ) as HTMLElement;
    const popupForm = popupClone.querySelector(
      CONSTANTS.popup,
    ) as HTMLFormElement;
    const cardImg = popupClone.querySelector(
      CONSTANTS.cardImg.class,
    ) as HTMLElement;
    const nameInput = popupClone.querySelector(
      CONSTANTS.nameInput,
    ) as HTMLInputElement;
    const phoneInput = popupClone.querySelector(
      CONSTANTS.phoneInput,
    ) as HTMLInputElement;
    const addressInput = popupClone.querySelector(
      CONSTANTS.addressInput,
    ) as HTMLInputElement;
    const emailInput = popupClone.querySelector(
      CONSTANTS.emailInput,
    ) as HTMLInputElement;
    const cardNumInput = popupClone.querySelector(
      CONSTANTS.cardNumInput,
    ) as HTMLInputElement;
    const validInput = popupClone.querySelector(
      CONSTANTS.validInput,
    ) as HTMLInputElement;
    const cvvInput = popupClone.querySelector(
      CONSTANTS.cvvInput,
    ) as HTMLInputElement;

    const submitBtn = new Button(
      CONSTANTS.submitBtn.class,
      CONSTANTS.submitBtn.text,
    ).draw() as HTMLButtonElement;

    cardImg.classList.add(CONSTANTS.cardImg.default);
    submitBtn.type = CONSTANTS.submitBtn.type;

    nameInput.addEventListener('change', () => {
      checkField(nameInput, REGEXP.nameRegExp);
    });

    phoneInput.addEventListener('change', () => {
      checkField(phoneInput, REGEXP.phoneRegExp);
    });

    addressInput.addEventListener('change', () => {
      checkField(addressInput, REGEXP.addressRegExp);
    });

    emailInput.addEventListener('change', () => {
      checkField(emailInput, REGEXP.emailRegExp);
    });

    cardNumInput.addEventListener('input', () => {
      if (!cardNumInput.value) {
        changeCardImg(cardImg, CONSTANTS.cardImg.default);
      } else {
        const maxInpLength = 19;

        if (cardNumInput.value.length > maxInpLength) {
          cardNumInput.value = cardNumInput.value.slice(0, maxInpLength);
        }

        cardNumInput.value = removeLetters(cardNumInput.value);
        cardNumInput.value = formatCardNumInput(cardNumInput.value);
        checkField(cardNumInput, REGEXP.cardNumRegExp);

        if (cardNumInput.value.startsWith(CARD_NUM_START.visa)) {
          changeCardImg(cardImg, CONSTANTS.cardImg.visa);

          return;
        }

        if (cardNumInput.value.startsWith(CARD_NUM_START.master)) {
          changeCardImg(cardImg, CONSTANTS.cardImg.master);

          return;
        }

        changeCardImg(cardImg, CONSTANTS.cardImg.american);
      }
    });

    validInput.addEventListener('input', () => {
      const maxInpLength = 5;

      if (validInput.value.length > maxInpLength) {
        validInput.value = validInput.value.slice(0, maxInpLength);
      }

      validInput.value = removeLetters(validInput.value);
      validInput.value = formatValidInput(validInput.value);
      checkField(validInput, REGEXP.validInpRegExp, true);
    });

    cvvInput.addEventListener('input', () => {
      const maxInpLength = 3;

      if (cvvInput.value.length > maxInpLength) {
        cvvInput.value = cvvInput.value.slice(0, maxInpLength);
      }

      cvvInput.value = removeLetters(cvvInput.value);
      checkField(cvvInput, REGEXP.cvvRegExp);
    });

    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        document.querySelector(APP_ROOT_CLASS)?.removeChild(popupOverlay);
      }
    });

    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formHandler(
        popupForm,
        nameInput,
        phoneInput,
        addressInput,
        emailInput,
        cardNumInput,
        validInput,
        cvvInput,
      );
    });

    popupForm.append(submitBtn);

    return popupClone;
  }
}
