import { LINK, ROUTES } from '../common/helpers/constants';
import { Data } from '../common/types/data';
import { Card } from '../components/card/card';
import { DataLoader } from '../components/data-loader/dataLoader';

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
  appRoot.innerHTML = '';
  // let result = '<h1>404 Not found</h1>'; //этот тег покажется если страницы с таким путем не существует
  if (routes.Main.match(path)) {
    //сравниваем совпадает ли переданный путь с путем к главной страницы
    // TODO: result = шаблон главной страницы
    // result = '<h1>Main page</h1>';
    loader.getData((data: Data[]) => {
      data.forEach((el: Data) => {
        appRoot.appendChild(new Card(el).draw());
      });
    });
  } else if (routes.Details.match('/' + path.split('/')[1].split('#')[0])) {
    //TODO: Подумать как это можно привести к норм виду
    // TODO: result = шаблон страницы деталей
    console.log(path);
    if (Number(path.split('#')[1]) > 0 && Number(path.split('#')[1]) < 101) {
      console.log('success');
      // result = '<h1>Card</h1>';
      loader.getData((data: Data[]) => {
        data.forEach((el: Data) => {
          if (el.id === Number(path.split('#')[1])) {
            appRoot.appendChild(new Card(el).draw());
          }
        });
      });
    }
  } else if (routes.Cart.match(path)) {
    // TODO: result = шаблон страницы с корзиной
    // result = '<h1>Cart page</h1>';
  }

  // добавляем контент на страницу
  // appRoot.innerHTML = result;
}

//функция для перехода на переданную страницу, все переходы по ссылкам должны происходить через эту функцию, иначе не будет писаться история в браузер
export function goTo(path: string): void {
  window.history.pushState({ path }, path, path); //добавляет путь в историю браузера, чтобы можно было потом переключать страницы стрелками в браузере
  render(path);
  console.log(window.location);
}

//функция инициализации роутинга
export function initRouter(): void {
  // событие, кот вызывается при переходе по истории браузера
  //тут мы получается когда нажимаем на кнопки в браузере должна рендериться страница с url на который мы переходим
  window.addEventListener('popstate', () => {
    render(
      new URL(window.location.href).pathname.concat(
        new URL(window.location.href).hash,
      ),
    );
    console.log(window.location);
    //window.location.href это полная ссылка, н.п. https://www.google.com/search?q=%....
    //new URL это объект, pathname возвращает путь после корневой директории, в случае с верхней ссылкой это /search
    //в нашем случае должно возвращаться либо '/' либо '/details' либо '/cart'
  });
  //ищем все ссылки, которые ведут не в корень сайта, чтобы поставить им функцию goTo вместо дефолтного перехода
  document.querySelectorAll('[href^="/"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLLinkElement;
      const path = new URL(target.href).pathname.concat(
        new URL(target.href).hash,
      );
      goTo(path);
    });
  });
  console.log(new URL(window.location.href));
  render(
    new URL(window.location.href).pathname.concat(
      new URL(window.location.href).hash,
    ),
  ); //этот рендер нужен для того, чтобы если нажать обновить страницу она обновилась правильно
}

//TODO: подключить роутер в app.ts и вызвать initRouter
