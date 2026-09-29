import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import { getServiceById } from "@/data/services";
import type { RootState } from "@/store";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addService: (
      state,
      action: PayloadAction<{ serviceId: string; quantity?: number }>
    ) => {
      const { serviceId, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.serviceId === serviceId);
      if (existing) {
        existing.quantity += quantity;
        return;
      }
      const service = getServiceById(serviceId);
      if (!service) return;
      state.items.push({
        serviceId: service.id,
        name: service.name,
        unit: service.unit,
        price: service.price,
        quantity,
      });
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.serviceId === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.serviceId === action.payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.serviceId !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeService: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.serviceId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addService, incrementQty, decrementQty, removeService, clearCart } =
  cartSlice.actions;

const EMPTY_ITEMS: CartItem[] = [];

export const selectCartItems = (state: RootState) => state.cart?.items ?? EMPTY_ITEMS;

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);

export const selectQuantityFor = (serviceId: string) =>
  createSelector(
    selectCartItems,
    (items) => items.find((item) => item.serviceId === serviceId)?.quantity ?? 0
  );

export default cartSlice.reducer;
