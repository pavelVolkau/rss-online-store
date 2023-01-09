import { SYMBOLS } from '../../helpers/constants';

export function setMinMax(
  inputMin: HTMLInputElement,
  inputMax: HTMLInputElement,
) {
  inputMin.max = inputMax.value;
  inputMax.min = inputMin.value;
}

export function setInputWidth(
  min: number,
  max: number,
  inputMin: HTMLInputElement,
  inputMax: HTMLInputElement,
) {
  const totalInpWidth = max - min;
  const minInpWidth = ((Number(inputMin.max) - min) * 100) / totalInpWidth;
  const maxInpWidth = ((max - Number(inputMax.min)) * 100) / totalInpWidth;

  inputMin.style.width = `${minInpWidth}${SYMBOLS.percent}`;
  inputMax.style.width = `${maxInpWidth}${SYMBOLS.percent}`;
}
