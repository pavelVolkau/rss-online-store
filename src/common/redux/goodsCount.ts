import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorage from '../components/localStorage/LocalStorage';

const initialState = {
  count: 0,
};

const storageData = LocalStorage.getLocalStorageData();
if (storageData.length > 0) {
  initialState.count = storageData.reduce((acc, obj) => acc + obj.count, 0);
}

const goodCount = createSlice({
  name: 'goodsCount',
  //указываем первоначальное состояние
  initialState,
  //создаем reducer в нем создаем actions
  reducers: {
    //state - это состояние именно для данного reducer
    //action.payload - это то, что мы передаем в dispatch данного action
    //action сам подставляет тип action кода он вызывается
    increaseGoodsCount(state, action: PayloadAction<number>) {
      state.count = state.count + action.payload;
    },
    decreaseGoodsCount(state, action: PayloadAction<number>) {
      const newGoodsCount = state.count - action.payload;

      if (newGoodsCount < 0) {
        state.count = 0;
      } else {
        state.count = newGoodsCount;
      }
    },
  },
});

// экспортируем actions чтобы вызывать их в dispatch где нужно
export const { increaseGoodsCount, decreaseGoodsCount } = goodCount.actions;
// экспортируем reducer чтобы добавить его в корневой reducer
export default goodCount.reducer;
