/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IOrder } from "@/types/cart";

const initialState: IOrder = {
  email: "",
  orderInfo: [],
  totalPrice: 0,
  customerInfo: {
    name: "",
    number: "",
    city: "",
    colony: "",
    postOffice: "",
    subDistrict: "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.orderInfo.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.orderInfo = state.orderInfo.filter(
        (product) => product.productId !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const product = state.orderInfo.find(
        (item) => item.productId === action.payload.productId
      );
      if (product) {
        product.orderedQuantity = action.payload.orderedQuantity;
      }
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.orderInfo.reduce(
        (acc, product) => acc + product.orderedQuantity * (product.price || 0),
        0
      );
    },
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    clearCart: (state) => {
      state.orderInfo = [];
      state.totalPrice = 0;
      state.customerInfo = {
        name: "",
        number: "",
        city: "",
        colony: "",
        postOffice: "",
        subDistrict: "",
      };
    },
  },
});

//* Selectors
export const orderedProductsSelector = (state: RootState) =>
  state.cart.orderInfo;
export const totalPriceSelector = (state: RootState) => state.cart.totalPrice;
export const customerInfoSelector = (state: RootState) =>
  state.cart.customerInfo;

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  updateTotalPrice,
  updateCustomerInfo,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
