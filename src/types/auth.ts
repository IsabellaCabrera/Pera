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
  email?: string;
  name?: string;
  profileImg?: string;
  role?: string;
  products?: Product[];
  orders?: Order[];
}

export interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}
