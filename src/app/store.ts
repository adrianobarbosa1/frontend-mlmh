import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import counterReducer from '../features/counter/counterSlice'


export function makeStore() {
  return configureStore({
    reducer: {
      register: registerReducer,
      counter: counterReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
