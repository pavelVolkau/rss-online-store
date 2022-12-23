import { DataBulk, ErrorTypes, CallbackDataFn } from './types';

export class DataLoader {
  private link: string;

  constructor(link: string) {
    this.link = link;
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === ErrorTypes.Err401 || res.status === ErrorTypes.Err404)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`,
        );
      throw Error(res.statusText);
    }
    return res;
  }

  // Пример вызова см. в app.ts
  public getData(callback: CallbackDataFn): void {
    fetch(this.link)
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: DataBulk) => callback(data.products))
      .catch((err: Error) => console.error(err));
  }
}
