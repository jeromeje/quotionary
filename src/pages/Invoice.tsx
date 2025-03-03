
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonCustom } from "@/components/ui/button-custom";
import PageTransition from "@/components/PageTransition";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getCartById } from "@/lib/data";
import { CartItem } from "@/lib/types";
import { format } from "date-fns";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{
    id: string;
    items: CartItem[];
    totalAmount: number;
    date: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
      toast.error("Please login to view invoice");
      navigate("/login");
      return;
    }
    setIsLoggedIn(true);

    // Fetch cart data
    if (id) {
      const cartData = getCartById(id);
      if (cartData) {
        setCart(cartData);
      } else {
        toast.error("Invoice not found");
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleDownload = () => {
    setIsLoading(true);
    
    // Simulate PDF generation process
    setTimeout(() => {
      toast.success("Invoice downloaded successfully");
      setIsLoading(false);
    }, 2000);
  };

  if (!isLoggedIn || !cart) {
    return null;
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto pt-24 pb-16 px-4">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">Invoice #{cart.id}</CardTitle>
                <CardDescription>
                  Date: {format(new Date(cart.date), "MMMM dd, yyyy")}
                </CardDescription>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-xl">FreshMart</h3>
                <p className="text-sm text-muted-foreground">123 Grocery Lane</p>
                <p className="text-sm text-muted-foreground">Fresh City, FC 12345</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Customer Information</h3>
              <div className="bg-muted/30 p-4 rounded-md">
                <p>Customer: {localStorage.getItem("userRole")}</p>
                <p>Email: {localStorage.getItem("userRole") === "admin" ? "admin@freshmart.com" : "user@freshmart.com"}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Order Summary</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-center">Quantity</th>
                      <th className="px-4 py-2 text-center">Price</th>
                      <th className="px-4 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-center">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method: Credit Card</p>
                <p className="text-sm text-muted-foreground">Transaction ID: FRH-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium mr-12">Subtotal:</span>
                  <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium mr-12">Tax (7%):</span>
                  <span>${(cart.totalAmount * 0.07).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="mr-12">Total:</span>
                  <span>${(cart.totalAmount * 1.07).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center bg-muted/30 border-t">
            <div className="text-sm text-muted-foreground">
              <p>Thank you for shopping with FreshMart!</p>
            </div>
            <ButtonCustom
              variant="premium"
              className="ml-auto"
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </>
              )}
            </ButtonCustom>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Invoice;
