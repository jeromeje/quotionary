
export interface QuotationItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Quotation {
  id: string;
  clientName: string;
  items: QuotationItem[];
  totalAmount: number;
  discountPercentage?: number;
  finalAmount?: number;
  date: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
