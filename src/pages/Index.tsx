
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { mockProducts } from "@/lib/data";
import { Store, ShoppingCart, Search } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types";
import { toast } from "sonner";

const Index = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
    
    // Get cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = mockProducts.filter(product => 
      product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      product.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filtered);
  };

  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart");
      return;
    }

    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ id: product.id, quantity: 1 });
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success(`Added ${product.name} to cart`);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="page-container pt-28">
          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              className="page-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="page-title">Welcome to FreshMart</h1>
              <p className="page-subtitle">Shop fresh groceries delivered to your door</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative max-w-lg mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search products or categories..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="section"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden card-hover">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={product.image || "https://via.placeholder.com/300x200"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{product.category}</p>
                      <p className="line-clamp-2 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">In Stock: {product.stock}</span>
                        <ButtonCustom 
                          size="sm" 
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> Add
                        </ButtonCustom>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
