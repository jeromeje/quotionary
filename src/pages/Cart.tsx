
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { mockProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";

interface CartItemWithProduct {
  id: string;
  product: Product;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Check if logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
      toast.error("Please login to view your cart");
      navigate("/login");
      return;
    }

    // Get cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      
      // Get full product details for each cart item
      const itemsWithProducts = parsedCart.map((item: {id: string, quantity: number}) => {
        const product = mockProducts.find(p => p.id === item.id);
        if (product) {
          return {
            id: item.id,
            product,
            quantity: item.quantity,
          };
        }
        return null;
      }).filter(Boolean);
      
      setCartItems(itemsWithProducts);
      
      // Calculate total
      const total = itemsWithProducts.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
      
      setTotalAmount(total);
    }
    
    setIsLoading(false);
  }, [navigate]);

  const updateQuantity = (id: string, change: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return item; // Don't allow less than 1
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    
    // Update localStorage and recalculate total
    const simplifiedCart = updatedCart.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));
    
    localStorage.setItem('cart', JSON.stringify(simplifiedCart));
    
    const total = updatedCart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    setTotalAmount(total);
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    
    // Update localStorage and recalculate total
    const simplifiedCart = updatedCart.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));
    
    localStorage.setItem('cart', JSON.stringify(simplifiedCart));
    
    const total = updatedCart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    setTotalAmount(total);
    toast.success("Item removed from cart");
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // In a real app, this would proceed to payment
    toast.success("Order placed successfully!");
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalAmount(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="page-container pt-28">
          <p className="text-center">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="page-container pt-28">
          <ButtonCustom 
            asChild 
            variant="outline" 
            size="sm" 
            className="mb-8"
            onClick={() => navigate("/")}
          >
            <div>
              <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
            </div>
          </ButtonCustom>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" /> Your Shopping Cart
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Your cart is empty</h3>
                      <p className="text-muted-foreground mb-4">Add some products to get started</p>
                      <ButtonCustom asChild variant="outline">
                        <div onClick={() => navigate("/")}>
                          Continue Shopping
                        </div>
                      </ButtonCustom>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center p-4 border rounded-md"
                        >
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image || "https://via.placeholder.com/300x200"} 
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex-grow">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.product.category}</p>
                            <p className="text-sm font-medium">${item.product.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <ButtonCustom 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </ButtonCustom>
                            
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            
                            <ButtonCustom 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </ButtonCustom>
                          </div>
                          
                          <div className="ml-4 text-right flex-shrink-0 w-24">
                            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <ButtonCustom 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive mt-1"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </ButtonCustom>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$0.00</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalAmount * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${(totalAmount + (totalAmount * 0.08)).toFixed(2)}</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <ButtonCustom
                    className="w-full"
                    variant="premium"
                    disabled={cartItems.length === 0}
                    onClick={checkout}
                  >
                    Checkout
                  </ButtonCustom>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
