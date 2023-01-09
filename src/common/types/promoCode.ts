export type PromoCode = {
  text: string;
  discount: number;
};
export type PromoCodesStorage = {
  [key: string]: PromoCode;
};
