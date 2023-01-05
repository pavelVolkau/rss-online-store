import { toData, toJSON } from '../../helpers/jsonChange';
import { localStorageData } from '../../types/localStorageData';
import CONSTANTS from './constants';

export default class LocalStorage {
  static getLocalStorageData(): localStorageData[] | void {
    const data = toData(localStorage.getItem(CONSTANTS.localStorageKey));

    if (data) return data;
  }

  static setLocalStorageData(data: localStorageData[]): void {
    localStorage.setItem(CONSTANTS.localStorageKey, toJSON(data));
  }

  static addDataToLocalStorage(data: localStorageData): void {
    const currentData = LocalStorage.getLocalStorageData();

    if (currentData) {
      currentData.push(data);
      LocalStorage.setLocalStorageData(currentData);
    } else {
      LocalStorage.setLocalStorageData([data]);
    }
  }

  static removeDataToLocalStorage(data: localStorageData): void {
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
