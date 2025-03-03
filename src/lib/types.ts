
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
