import { Data } from '../../common/types/data';

export type DataBulk = {
  products: Data[];
  total: number;
  skip: number;
  limit: number;
};

export enum ErrorTypes {
  Err401 = 401,
  Err404 = 404,
}

export type CallbackDataFn = (data: Data[]) => void;
