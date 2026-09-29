import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isCartOpen: boolean;
  isServiceModalOpen: boolean;
  selectedServiceId: string | null;
  isMobileMenuOpen: boolean;
}

const initialState: UiState = {
  isCartOpen: false,
  isServiceModalOpen: false,
  selectedServiceId: null,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openServiceModal: (state, action: PayloadAction<string>) => {
      state.selectedServiceId = action.payload;
      state.isServiceModalOpen = true;
    },
    closeServiceModal: (state) => {
      state.isServiceModalOpen = false;
      state.selectedServiceId = null;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  openServiceModal,
  closeServiceModal,
  openMobileMenu,
  closeMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;
