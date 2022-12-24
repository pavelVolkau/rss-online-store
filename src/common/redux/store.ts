import {
  configureStore,
  combineReducers,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import goodsCount from './goodsCount';
import priceSum from './priceSum';

const initialStore = createSlice({
  name: 'Initial store',
  initialState: { storeInit: 'store not init' },
  reducers: {
    initStore(state, action: PayloadAction<string>) {
      state.storeInit = action.payload;
    },
  },
});
// добавляем сюда все reducers
const rootReducer = combineReducers({
  goodsCount,
  priceSum,
});

// создаем общий store где будут храниться все состояния
const store = configureStore({
  reducer: rootReducer,
});

// экспортируем store чтобы работать с ним
export default store;
export const { initStore } = initialStore.actions;
// экспортируем тип, который будет у метода store.getState()
export type RootState = ReturnType<typeof store.getState>;

// Пример использования:
/* buttonPlus.addEventListener('click', () => {

  # определяем действие при нажатии на кнопку
  # в dispatch передается action, которму передается
  # необходимое значение, которое будет находится в action.payload

  store.dispatch(increaseGoodsCount(1));
});
buttonMinus.addEventListener('click', () => {
  store.dispatch(decreaseGoodsCount(1));
});
store.subscribe(() => {

  # callback вызывается каждый раз при смене state
  # смотрим на состояние state в store
  # подставляем значение из state в элемент
  # состояние берем из конкретного reducer

  const state: RootState = store.getState();

  divCount.innerText = state.goodsCount.count.toString();
}); */
