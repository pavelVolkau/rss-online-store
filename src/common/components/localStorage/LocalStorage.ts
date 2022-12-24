import { Data } from '../../types/data';
import { toData, toJSON } from '../../helpers/jsonChange';
import CONSTANTS from './constants';

export default class LocalStorage {
  static getLocalStorageData(): Data[] | void {
    const data = toData(localStorage.getItem(CONSTANTS.localStorageKey));

    if (data) return data;
  }

  static setLocalStorageData(data: Data[]): void {
    localStorage.setItem(CONSTANTS.localStorageKey, toJSON(data));
  }

  static addDataToLocalStorage(data: Data): void {
    const currentData = LocalStorage.getLocalStorageData();

    if (currentData) {
      currentData.push(data);
      localStorage.setItem(CONSTANTS.localStorageKey, toJSON(currentData));
    } else {
      localStorage.setItem(CONSTANTS.localStorageKey, toJSON([data]));
    }
  }

  static removeDataToLocalStorage(data: Data): void {
    const currentData = LocalStorage.getLocalStorageData();

    if (currentData) {
      const indexOfRemoveObj = currentData.findIndex(
        (obj) => obj.id === data.id,
      );

      if (indexOfRemoveObj !== -1) {
        currentData.splice(indexOfRemoveObj, 1);
        LocalStorage.setLocalStorageData(currentData);
      }
    }
  }
}
