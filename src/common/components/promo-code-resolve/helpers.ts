import { LOCAL_STORAGE_KEYS, PROMO_CODES } from '../../helpers/constants';
import { toData, toJSON } from '../../helpers/jsonChange';
import { PromoCodesStorage } from '../../types/promoCode';

export default function promoCodesStorage(promo: string): void {
  const currentStorageData = localStorage.getItem(
    LOCAL_STORAGE_KEYS.promoCodes,
  );

  if (!currentStorageData) {
    const newPromo: PromoCodesStorage = {
      [promo]: PROMO_CODES[promo],
    };

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.promoCodes,
      toJSON<PromoCodesStorage>(newPromo),
    );

    return;
  }

  const data = toData<PromoCodesStorage>(currentStorageData);

  if (!Object.keys(data).includes(promo)) {
    data[promo] = PROMO_CODES[promo];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.promoCodes,
      toJSON<PromoCodesStorage>(data),
    );
  }
}
