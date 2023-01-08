import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorage from '../components/localStorage/LocalStorage';

const initialState = {
  price: 0,
};

const storageData = LocalStorage.getLocalStorageData();
if (storageData.length > 0) {
  initialState.price = storageData.reduce(
    (acc, obj) => acc + obj.data.price * obj.count,
    0,
  );
}

const priceSum = createSlice({
  name: 'priceSum',
  initialState,
  reducers: {
    addPrice(state, action: PayloadAction<number>) {
      state.price = state.price + action.payload;
    },
    subtractPrice(state, action: PayloadAction<number>) {
      const newPrice = state.price - action.payload;

      if (newPrice < 0) {
        state.price = 0;
      } else {
        state.price = newPrice;
      }
    },
  },
});

export const { addPrice, subtractPrice } = priceSum.actions;
export default priceSum.reducer;
