import {
  TAGS,
  PROMO_CODES,
  SYMBOLS,
  LOCAL_STORAGE_KEYS,
} from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import IDrawComponent from '../../interface/IDrawComponent';
import { Button } from '../button/Button';
import CONSTANTS from './constants';
import promoCodesStorage from './helpers';
import './promo-code-resolve.scss';

export default class PromoCodeResolve implements IDrawComponent {
  constructor(private readonly promoCode: string) {}

  public draw() {
    const promoDiscount = PROMO_CODES[this.promoCode].discount;
    const promoDescription = `${PROMO_CODES[this.promoCode].text}: ${
      SYMBOLS.minus
    }${promoDiscount}${SYMBOLS.percent}`;
    const resolvePromo = getDOMElement(TAGS.div, CONSTANTS.resolvePromo.class);
    const promoInfo = getDOMElement(
      TAGS.span,
      CONSTANTS.promoInfo.class,
      promoDescription,
    );

    resolvePromo.append(promoInfo);

    const storageDataJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.promoCodes);

    //отображаем кнопку если в локал сторадже нет кодов или этот код еще не введен
    if (
      !storageDataJSON ||
      !Object.keys(JSON.parse(storageDataJSON)).includes(this.promoCode)
    ) {
      const addPromoBtn = new Button(
        CONSTANTS.addPromoBtn.class,
        CONSTANTS.addPromoBtn.text,
      ).draw();

      resolvePromo.append(addPromoBtn);

      //лисенер на удаление кнопки ADD при нажатии на нее + добавление данного промокода в локал сторадж
      addPromoBtn.addEventListener('click', () => {
        promoCodesStorage(this.promoCode);
        addPromoBtn.parentNode?.removeChild(addPromoBtn);
      });
    }

    return resolvePromo;
  }
}
