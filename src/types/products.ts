import type { Order, UserData } from "./auth";

export interface Offer {
  restaurantId: string | number;
  offerImg: string;
  offerTitle: string;
  description: string;
  originalPrice: number;
  peraPrice: number;
  stock: number;
  windowEnd: string;
  windowStart: string;
}

export interface InitialState {
  restaurants: UserData[];
  restaurant: UserData;
  cart: Offer[];
  order: Order;
  offers: [];
}
