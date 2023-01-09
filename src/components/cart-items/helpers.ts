import LocalStorage from '../../common/components/localStorage/LocalStorage';
import { addQuery } from '../../common/helpers/addQuery';
import { QUERY_PARAMS } from '../../common/helpers/constants';
import { localStorageData } from '../../common/types/localStorageData';

export function resolveActualPage(
  currentPage: number,
  currentLimit: number,
  currentLink?: string,
): string {
  const storageData = LocalStorage.getLocalStorageData() as localStorageData[];
  const maxPageNumber = Math.ceil(storageData.length / currentLimit);

  if (maxPageNumber < currentPage) {
    const newLink = addQuery(
      QUERY_PARAMS.page,
      maxPageNumber.toString(),
      false,
      currentLink,
    );

    return newLink;
  }

  return '';
}
