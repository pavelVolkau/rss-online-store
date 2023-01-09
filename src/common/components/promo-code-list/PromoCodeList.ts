import { LOCAL_STORAGE_KEYS, SYMBOLS, TAGS } from '../../helpers/constants';
import getDOMElement from '../../helpers/getDOMElement';
import { toData, toJSON } from '../../helpers/jsonChange';
import IDrawComponent from '../../interface/IDrawComponent';
import { PromoCodesStorage } from '../../types/promoCode';
import { Button } from '../button/Button';
import CONSTANTS from './constants';
import './promo-code-list.scss';

export default class PromoCodeList implements IDrawComponent {
  public draw() {
    const promo = getDOMElement(TAGS.div, CONSTANTS.promo.class);
    const header = getDOMElement(
      TAGS.div,
      CONSTANTS.header.class,
      CONSTANTS.header.text,
    );
    const container = getDOMElement(TAGS.ul, CONSTANTS.container.class);
    const storageDataJson = localStorage.getItem(LOCAL_STORAGE_KEYS.promoCodes);

    //если промокоды есть в сторадже то добавляем
    if (storageDataJson) {
      const storageData: PromoCodesStorage =
        toData<PromoCodesStorage>(storageDataJson);

      for (const key in storageData) {
        const promoItem = getDOMElement(TAGS.li, CONSTANTS.promoItem.class);
        const description = `${storageData[key].text}: ${SYMBOLS.minus}${storageData[key].discount}${SYMBOLS.percent}`;
        const promoDesc = getDOMElement(
          TAGS.span,
          CONSTANTS.promoDesc.class,
          description,
        );
        const promoDropBtn = new Button(
          CONSTANTS.promoDropBtn.class,
          CONSTANTS.promoDropBtn.text,
        ).draw();

        //лисенер удаляет из локал стораджа данный промокод
        promoDropBtn.addEventListener('click', () => {
          delete storageData[key];

          //если это был единственный промокод, то удаляем весь блок с промокодами
          if (Object.keys(storageData).length === 0) {
            const promo = promoDropBtn.closest(
              `.${CONSTANTS.promo.class}`,
            ) as HTMLElement;

            promo.parentNode?.removeChild(promo);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.promoCodes);
          } else {
            //иначе удаляем только конкретный
            const promoItem = promoDropBtn.closest(
              `.${CONSTANTS.promoItem.class}`,
            ) as HTMLElement;

            promoItem.parentNode?.removeChild(promoItem);
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.promoCodes,
              toJSON<PromoCodesStorage>(storageData),
            );
          }
        });

        promoItem.append(promoDesc, promoDropBtn);
        container.append(promoItem);
      }
    }

    promo.append(header, container);

    return promo;
  }
}
