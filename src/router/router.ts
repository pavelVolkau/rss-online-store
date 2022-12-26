import { LINK, ROUTES } from '../common/helpers/constants';
import { Data } from '../common/types/data';
import { Card } from '../components/card/Card';
import { DataLoader } from '../components/data-loader/DataLoader';
import { GoodsBox } from '../components/goods-box/GoodsBox';
import { applyQueries, createLink, isInline } from './helpers';

const loader = new DataLoader(LINK);
// TODO: импортировать шаблоны страниц

//принимает путь и заменяет контент в html в диве app-root
export function render(path: string): void {
  const appRoot = document.querySelector('.app-root') as HTMLElement;
  if (ROUTES.main.match(path.split('?')[0])) {
    //сравниваем совпадает ли переданный путь с путем к главной страницы
    // TODO: result = шаблон главной страницы
    if (path.split('?').length === 1) {
      loader.getData((data: Data[]) => {
        appRoot.replaceChildren(new GoodsBox(data).draw());
      });
    } else {
      const queries = path.split('?')[1]; //отрезаем знак вопроса
      loader.getData((data: Data[]) => {
        const newDataArr = applyQueries(queries, data);
        const view = isInline(queries);
        appRoot.replaceChildren(new GoodsBox(newDataArr, view).draw());
      });
    }
  } else if (ROUTES.details.match(`/${path.split('/')[1]}`)) {
    // TODO: result = шаблон страницы деталей

    loader.getData((data: Data[]) => {
      const idArr: number[] = data.map((el) => el.id);
      const cardIdFromPath = Number(path.split(ROUTES.details)[1].slice(1));
      if (idArr.includes(cardIdFromPath)) {
        data.forEach((el: Data) => {
          if (el.id === cardIdFromPath) {
            appRoot.replaceChildren(new Card(el).draw());
          }
        });
      } else {
        appRoot.replaceChildren('<h1>Not found</h1>');
      }
    });
  } else if (ROUTES.cart.match(`/${path.split('/')[1]}`)) {
    // TODO: result = шаблон страницы с корзиной
    appRoot.replaceChildren('<h1>Cart </h1>');
  } else {
    appRoot.replaceChildren('<h1>Not found</h1>');
  }
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
  //ищем все ссылки, которые ведут не в корень сайта, чтобы поставить им функцию goTo вместо дефолтного перехода
  // document.querySelectorAll('[href^="/"]').forEach((el) => {
  //   el.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const target = e.target as HTMLLinkElement;
  //     goTo(createLink(target));
  //   });
  // });
  render(createLink(window.location)); //этот рендер нужен для того, чтобы если нажать обновить страницу она обновилась правильно
}
