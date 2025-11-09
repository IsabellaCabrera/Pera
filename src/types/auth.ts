import type { Offer } from "./products";
import type { AvailabilityItem } from "./signup";

export interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  restaurant: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface UserData {
  uid?: string;
  email?: string;
  name?: string;
  phone?: string;
  nit?: string;
  category?: string;
  address?: string;
  profileImg?: string;
  role?: string;
  availability?: AvailabilityItem[];
  products?: Product[];
  orders?: Order[];
  offers?: Offer[];
}

export interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}
