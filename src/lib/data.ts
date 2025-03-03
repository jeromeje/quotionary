
import { Product, Cart } from "./types";

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Fresh Apples",
    price: 2.99,
    category: "Fruits",
    description: "Fresh and juicy apples, perfect for snacking or baking.",
    stock: 50,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "p2",
    name: "Organic Bananas",
    price: 1.99,
    category: "Fruits",
    description: "Organic bananas, rich in potassium and perfect for smoothies.",
    stock: 40,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "p3",
    name: "Whole Milk",
    price: 3.49,
    category: "Dairy",
    description: "Fresh whole milk from local farms.",
    stock: 30,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "p4",
    name: "Whole Wheat Bread",
    price: 4.29,
    category: "Bakery",
    description: "Freshly baked whole wheat bread, perfect for sandwiches.",
    stock: 25,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: "p5",
    name: "Chicken Breast",
    price: 7.99,
    category: "Meat",
    description: "Fresh boneless, skinless chicken breast.",
    stock: 20,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400&h=300"
  },
];

export const mockCarts: Cart[] = [
  {
    id: "c1",
    userId: "user123",
    items: [
      { id: "ci1", productId: "p1", name: "Fresh Apples", quantity: 2, price: 2.99 },
      { id: "ci2", productId: "p3", name: "Whole Milk", quantity: 1, price: 3.49 },
    ],
    totalAmount: 9.47,
    date: "2023-06-15",
    status: "completed",
  },
  {
    id: "c2",
    userId: "user123",
    items: [
      { id: "ci3", productId: "p2", name: "Organic Bananas", quantity: 3, price: 1.99 },
      { id: "ci4", productId: "p4", name: "Whole Wheat Bread", quantity: 1, price: 4.29 },
    ],
    totalAmount: 10.26,
    date: "2023-06-18",
    status: "pending",
  },
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

export function getCartById(id: string): Cart | undefined {
  return mockCarts.find(cart => cart.id === id);
}
