
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { ShoppingCart, Trash2, ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/lib/types";
import { mockCarts } from "@/lib/data";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    // Get cart from localStorage or use empty array
    const savedCart = localStorage.getItem("cart");
    const initialCart = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(initialCart);

    // Calculate total
    const total = initialCart.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    // Update total
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    // Update total
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);

    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please login to checkout");
      navigate("/login?redirect=/cart");
      return;
    }

    toast.success("Order placed successfully!");
    // Clear cart after checkout
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setTotalAmount(0);
  };

  const handleGenerateInvoice = () => {
    if (!isLoggedIn) {
      toast.error("Please login to generate invoice");
      navigate("/login?redirect=/cart");
      return;
    }

    // Use the first mock cart for demo purposes
    // In a real app, you'd create a new invoice in the database
    navigate(`/invoice/${mockCarts[0].id}`);
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="container max-w-6xl mx-auto pt-24 pb-16 px-4">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" /> Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <Card className="border-2 border-dashed bg-muted/50">
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-xl font-medium">Your cart is empty</h3>
                  <p className="text-muted-foreground max-w-md">
                    Looks like you haven't added any products to your cart yet.
                  </p>
                  <Button
                    className="mt-2"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
                    <CardDescription>
                      Review your items before checking out
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                            <span className="text-2xl">🥕</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium truncate">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right min-w-[80px]">
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border shadow-sm sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(totalAmount * 0.07).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${(totalAmount * 1.07).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <ButtonCustom
                      variant="premium"
                      className="w-full"
                      onClick={handleCheckout}
                    >
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </ButtonCustom>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGenerateInvoice}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Invoice
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Cart;
