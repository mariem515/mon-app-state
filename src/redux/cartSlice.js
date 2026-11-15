import { createSlice } from '@reduxjs/toolkit';
export const DEFAULT_STOCK = 3;
function loadCartItems() {
  try {
    const savedItems = localStorage.getItem('techstore_cart');
    const items = JSON.parse(savedItems ?? '[]');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function recalculateTotals(state) {
  state.totalCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

const initialState = {
  items: loadCartItems(),
  totalCount: 0,
  totalPrice: 0,
  discountPercent: 0,
};

recalculateTotals(initialState);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
  const product = action.payload;
  const existing = state.items.find((item) => item.id === product.id);
  const stock = product.stock ?? DEFAULT_STOCK;

  if ((existing?.quantity ?? 0) >= stock) {
    return;
  }

  if (existing) {
    existing.quantity += 1;
  } else {
    state.items.push({ ...product, quantity: 1 });
  }

  recalculateTotals(state);
},

    removeItem(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index === -1) return;

      const item = state.items[index];

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items.splice(index, 1);
      }

      if (state.items.length === 0) {
        state.discountPercent = 0;
      }

      recalculateTotals(state);
    },

    clearCart() {
      return {
        items: [],
        totalCount: 0,
        totalPrice: 0,
        discountPercent: 0,
      };
    },

    applyPromoCode(state, action) {
      const code = action.payload.trim().toUpperCase();
      state.discountPercent = code === 'POLY2027' ? 20 : 0;
    },
  },
});

export const { addItem, removeItem, clearCart, applyPromoCode } =
  cartSlice.actions;

export default cartSlice.reducer;