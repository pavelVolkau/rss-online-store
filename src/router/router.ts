import { LINK, ROUTES } from '../common/helpers/constants';
import { Data } from '../common/types/data';
import { Card } from '../components/card/Card';
import { DataLoader } from '../components/data-loader/DataLoader';
import { GoodsBox } from '../components/goods-box/GoodsBox';
import { createLink, elemInQuery } from './helpers';

const loader = new DataLoader(LINK);
// TODO: импортировать шаблоны страниц

export const routes = {
  Main: `${ROUTES.index}`, // путь к главной странице
  Details: `${ROUTES.details}`,
  Cart: `${ROUTES.cart}`,
};

//принимает путь и заменяет контент в html в диве app-root
export function render(path: string): void {
  const appRoot = document.querySelector('.app-root') as HTMLElement;
  // appRoot.innerHTML = '';
  if (routes.Main.match(path.split('?')[0])) {
    //сравниваем совпадает ли переданный путь с путем к главной страницы
    // TODO: result = шаблон главной страницы
    if (path.split('?').length === 1) {
      loader.getData((data: Data[]) => {
        appRoot.replaceChildren(new GoodsBox(data).draw());
      });
    } else {
      const queries = path.split('?')[1]; //отрезаем знак вопроса
      loader.getData((data: Data[]) => {
        const newData = data.filter((elem) => {
          return elemInQuery(queries, elem);
        });
        appRoot.replaceChildren(new GoodsBox(newData).draw());
      });
    }
  } else if (routes.Details.match(path.split('#')[0])) {
    //TODO: Подумать как это можно привести к норм виду
    // TODO: result = шаблон страницы деталей
    if (Number(path.split('#')[1]) > 0 && Number(path.split('#')[1]) < 101) {
      loader.getData((data: Data[]) => {
        data.forEach((el: Data) => {
          if (el.id === Number(path.split('#')[1])) {
            appRoot.replaceChildren(new Card(el).draw());
          }
        });
      });
    } else {
      appRoot.replaceChildren('<h1>Not found</h1>');
    }
  } else if (routes.Cart.match(path)) {
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
  document.querySelectorAll('[href^="/"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLLinkElement;
      goTo(createLink(target));
    });
  });
  render(createLink(window.location)); //этот рендер нужен для того, чтобы если нажать обновить страницу она обновилась правильно
}
