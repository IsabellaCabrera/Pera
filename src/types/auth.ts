import type { Offer } from "./products";
import type { AvailabilityItem } from "./signup";

export interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Order {
  orderId: string;
  orderCode: string;
  status: "preparing" | "ready";
  customerId: string;
  customerName: string;
  total: number;
  items: Offer[];
  createdAt? : string;
}

export interface UserData {
  uid: string;
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
