
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { mockProducts } from "@/lib/data";
import { v4 as uuidv4 } from 'uuid';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    if (role !== "admin") {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Create new product
    const newProduct = {
      id: uuidv4(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image || "https://via.placeholder.com/300x200",
      stock: parseInt(formData.stock),
    };
    
    // In a real app, you would save to a database
    // For demo, we'll just add to our mock data
    mockProducts.push(newProduct);
    
    toast.success("Product added successfully");
    navigate("/");
  };

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
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </div>
          </ButtonCustom>
          
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Store className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl">Add New Product</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <ButtonCustom
                      type="submit"
                      className="w-full"
                      variant="premium"
                    >
                      <Save className="mr-2 h-4 w-4" /> Add Product
                    </ButtonCustom>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminAddProduct;
