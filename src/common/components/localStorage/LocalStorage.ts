import { LOCAL_STORAGE_KEYS } from '../../helpers/constants';
import { toData, toJSON } from '../../helpers/jsonChange';
import { localStorageData } from '../../types/localStorageData';

export default class LocalStorage {
  static getLocalStorageData(): localStorageData[] {
    const checkLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_KEYS.selectedGoods,
    );

    if (checkLocalStorage) {
      const data = toData<localStorageData[]>(checkLocalStorage);
      return data;
    }

    return [];
  }

  static setLocalStorageData(data: localStorageData[]): void {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.selectedGoods,
      toJSON<localStorageData[]>(data),
    );
  }

  static addDataToLocalStorage(data: localStorageData): void {
    if (data.count === 0) {
      LocalStorage.removeDataToLocalStorage(data);
      return;
    }

    const currentData = LocalStorage.getLocalStorageData();

    if (currentData.length === 0) {
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

    if (currentData.length !== 0) {
      const indexOfRemoveObj = currentData.findIndex(
        (obj) => obj.id === data.id,
      );

      if (indexOfRemoveObj !== -1) {
        currentData.splice(indexOfRemoveObj, 1);
      }

      if (currentData.length === 0) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.selectedGoods);
      } else {
        LocalStorage.setLocalStorageData(currentData);
      }
    }
  }
}
