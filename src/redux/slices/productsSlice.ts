import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialState, Offer } from "../../types/products";
import type { Order, UserData } from "../../types/auth";

const initialState: InitialState = {
  restaurants: [],
  restaurant: {
    uid: "",
  },
  cart: [],
  order: {
    status: "preparing",
    orderCode: "",
    orderId: "",
    customerId: "",
    customerName: "",
    total: 0,
    items: [],
  },
  offers: [],
};

const productsSlice = createSlice({
  name: "restuarants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<UserData>) => {
      state.restaurants = [...state.restaurants, action.payload];
    },
    setRestaurant: (state, action: PayloadAction<UserData>) => {
      state.restaurant = action.payload;
    },
    setCart: (state, action: PayloadAction<Offer>) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<string | number>) => {
      state.cart = state.cart.filter(
        (offer) => offer.offerTitle !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = {
        status: "preparing",
        orderCode: "",
        orderId: "",
        customerId: "",
        customerName: "",
        total: 0,
        items: [],
      };
    },
  },
});

export const {
  setRestaurants,
  setRestaurant,
  setCart,
  deleteFromCart,
  clearCart,
  setOrder,
  clearOrder,
} = productsSlice.actions;
export default productsSlice.reducer;
