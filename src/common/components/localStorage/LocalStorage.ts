import { toData, toJSON } from '../../helpers/jsonChange';
import { localStorageData } from '../../types/localStorageData';
import CONSTANTS from './constants';

export default class LocalStorage {
  static getLocalStorageData(): localStorageData[] {
    const data = toData(localStorage.getItem(CONSTANTS.localStorageKey));

    if (data) return data;

    return [];
  }

  static setLocalStorageData(data: localStorageData[]): void {
    localStorage.setItem(CONSTANTS.localStorageKey, toJSON(data));
  }

  static addDataToLocalStorage(data: localStorageData): void {
    if (data.count === 0) {
      LocalStorage.removeDataToLocalStorage(data);
      return;
    }

    const currentData = LocalStorage.getLocalStorageData();

    if (!currentData) {
      LocalStorage.setLocalStorageData([data]);
    } else {
      const indexOfAddObj = currentData.findIndex((obj) => obj.id === data.id);

      if (indexOfAddObj !== -1) {
        currentData[indexOfAddObj] = data;
      } else {
        currentData.push(data);
      }

      LocalStorage.setLocalStorageData(currentData);
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
      }

      if (currentData.length === 0) {
        localStorage.removeItem(CONSTANTS.localStorageKey);
      } else {
        LocalStorage.setLocalStorageData(currentData);
      }
    }
  }
}
