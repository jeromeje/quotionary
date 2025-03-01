
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonCustom } from "./ui/button-custom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, Send, Percent } from "lucide-react";
import { QuotationItem } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QuotationFormProps {
  onSubmit?: (formData: any) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState<QuotationItem[]>([
    { id: uuidv4(), name: "", quantity: 1, price: 0 },
  ]);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const addItem = () => {
    setItems([...items, { id: uuidv4(), name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) {
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const calculateFinalAmount = () => {
    const subtotal = calculateTotal();
    const discountAmount = (subtotal * discountPercentage) / 100;
    return subtotal - discountAmount;
  };

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'sent') => {
    e.preventDefault();
    
    // Validate form
    if (!clientName.trim()) {
      toast.error("Please enter a client name");
      return;
    }
    
    if (items.some(item => !item.name.trim())) {
      toast.error("Please enter a name for all items");
      return;
    }

    const formData = {
      id: uuidv4(),
      clientName,
      items,
      totalAmount: calculateTotal(),
      discountPercentage,
      finalAmount: calculateFinalAmount(),
      date: new Date().toISOString().split("T")[0],
      status,
    };

    if (onSubmit) {
      onSubmit(formData);
    }
    
    toast.success(
      status === "draft" 
        ? "Quotation saved as draft" 
        : "Quotation created and ready to send"
    );
    
    navigate("/");
  };

  return (
    <form className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="mt-1"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Items</h3>
            <ButtonCustom
              type="button"
              onClick={addItem}
              variant="outline"
              size="sm"
              className="group"
            >
              <Plus className="mr-1 h-4 w-4 transition-transform group-hover:rotate-90" /> 
              Add Item
            </ButtonCustom>
          </div>

          <Card className="overflow-hidden">
            <div className="px-6 pt-6 pb-2 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Item</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-3">Price</div>
              <div className="col-span-1"></div>
            </div>

            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-3 border-t"
                >
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                        placeholder={`Item ${index + 1}`}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={item.price}
                        min={0}
                        step={0.01}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-full hover:bg-destructive/10"
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="px-6 py-4 border-t">
              <div className="flex items-center space-x-4">
                <Label htmlFor="discount" className="shrink-0">Discount (%)</Label>
                <div className="relative w-full max-w-[120px]">
                  <Input
                    id="discount"
                    type="number"
                    value={discountPercentage}
                    min={0}
                    max={100}
                    onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-secondary/50">
              <div className="flex justify-end">
                <div className="text-right space-y-1">
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span className="mr-8">Subtotal</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span className="mr-8">Discount ({discountPercentage}%)</span>
                      <span>-${((calculateTotal() * discountPercentage) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="text-2xl font-medium pt-2 border-t">
                    ${calculateFinalAmount().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <ButtonCustom
          type="button"
          variant="outline"
          onClick={(e) => handleSubmit(e, 'draft')}
        >
          <Save className="mr-2 h-4 w-4" /> Save as Draft
        </ButtonCustom>
        <ButtonCustom
          type="button"
          variant="premium"
          onClick={(e) => handleSubmit(e, 'sent')}
        >
          <Send className="mr-2 h-4 w-4" /> Create Quotation
        </ButtonCustom>
      </div>
    </form>
  );
};

export default QuotationForm;
