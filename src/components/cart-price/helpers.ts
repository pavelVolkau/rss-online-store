import { LOCAL_STORAGE_KEYS } from '../../common/helpers/constants';
import { toData } from '../../common/helpers/jsonChange';
import { PromoCodesStorage } from '../../common/types/promoCode';
import CONSTANTS from './constants';

export function priceCalculation(basePrice: number): string {
  const storageDataJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.promoCodes);
  const priceInfo = CONSTANTS.totalPrice.text;

  if (!storageDataJSON) return `${priceInfo}${basePrice}`;

  const storageData = toData<PromoCodesStorage>(storageDataJSON);
  const sumDiscount = Object.values(storageData).reduce(
    (acc, obj) => acc + obj.discount,
    0,
  );
  const newPrice = basePrice - basePrice * (sumDiscount / 100);

  return `${priceInfo}${newPrice}`;
}
