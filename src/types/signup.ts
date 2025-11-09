export interface AvailabilityItem {
  day: string;
  hours: string[];
}

export interface SellerForm {
  businessName: string;
  email: string;
  password: string;
  phone: string;
  nit: string;
  category: string;
  address: string;
  availability: AvailabilityItem[];
}