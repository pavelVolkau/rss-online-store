import {
  APP_ROOT,
  LINK,
  SEPARATORS,
  ROUTES,
} from '../common/helpers/constants';
import { createLink } from '../common/helpers/createLink';
import { Data } from '../common/types/data';
import { DataLoader } from '../components/data-loader/DataLoader';
import { GoodsBox } from '../components/goods-box/GoodsBox';
import { DetailsPage } from '../pages/details-page/DetailsPage';
import { applyQueries, isInline } from './helpers';

const loader = new DataLoader(LINK);
// TODO: импортировать шаблоны страниц

//принимает путь и заменяет контент в html в диве app-root
export function render(path: string): void {
  const pathWithQuery = path.split(SEPARATORS.searchQuery);
  const pathName = pathWithQuery[0];
  const query = pathWithQuery[1];

  if (ROUTES.main.match(pathName)) {
    //сравниваем совпадает ли переданный путь с путем к главной страницы
    // TODO: result = шаблон главной страницы
    if (pathWithQuery.length === 1) {
      loader.getData((data: Data[]) => {
        APP_ROOT.replaceChildren(new GoodsBox(data).draw());
      });

      return;
    }
    loader.getData((data: Data[]) => {
      const newDataArr = applyQueries(query, data);
      const view = isInline(query);
      APP_ROOT.replaceChildren(new GoodsBox(newDataArr, view).draw());
    });

    return;
  }

  const pagePathNameWithQuery = path.split(SEPARATORS.path);
  const pagePathName = SEPARATORS.path + pagePathNameWithQuery[1];
  const pageQuery = pagePathNameWithQuery[2];

  if (ROUTES.details.match(pagePathName)) {
    // TODO: result = шаблон страницы деталей

    loader.getData((data: Data[]) => {
      const idArr: number[] = data.map((el) => el.id);
      const cardIdFromPath = Number(pageQuery);
      const currentCardIndex = idArr.indexOf(cardIdFromPath);
      if (currentCardIndex !== -1) {
        APP_ROOT.replaceChildren(
          new DetailsPage(data[currentCardIndex]).draw(),
        );

        return;
      }

      APP_ROOT.replaceChildren('<h1>Not found</h1>');

      return;
    });
  }

  if (ROUTES.cart.match(pagePathName)) {
    // TODO: result = шаблон страницы с корзиной
    APP_ROOT.replaceChildren('<h1>Cart </h1>');

    return;
  }
  APP_ROOT.replaceChildren('<h1>Not found</h1>');

  return;
}

//функция для перехода на переданную страницу, все переходы по ссылкам должны происходить через эту функцию, иначе не будет писаться история в браузер
export function goTo(path: string): void {
  window.history.pushState({ path }, path, path); //добавляет путь в историю браузера, чтобы можно было потом переключать страницы стрелками в браузере
  render(path);
}

//функция инициализации роутинга
export function initRouter(): void {
  // событие, кот вызывается при переходе по истории браузера
  //тут мы получается когда нажимаем на кнопки в браузере должна рендериться страница с url на который мы переходим
  window.addEventListener('popstate', () => {
    render(createLink(window.location));
  });

  render(createLink(window.location)); //этот рендер нужен для того, чтобы если нажать обновить страницу она обновилась правильно
}
