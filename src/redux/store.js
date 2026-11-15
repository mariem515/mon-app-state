import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const { items } = store.getState().cart;
  localStorage.setItem('techstore_cart', JSON.stringify(items));
});