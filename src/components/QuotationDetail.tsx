
import React from "react";
import { Quotation } from "@/lib/types";
import { ButtonCustom } from "./ui/button-custom";
import { Card } from "@/components/ui/card";
import { Download, Send, FileText, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface QuotationDetailProps {
  quotation: Quotation;
}

const QuotationDetail: React.FC<QuotationDetailProps> = ({ quotation }) => {
  const statusColors = {
    draft: "bg-blue-100 text-blue-800",
    sent: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };

  // Calculate the final amount if it's not already provided
  const finalAmount = quotation.finalAmount || quotation.totalAmount;
  const hasDiscount = quotation.discountPercentage && quotation.discountPercentage > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-medium">Quotation #{quotation.id.substring(0, 6)}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-muted-foreground">
              {new Date(quotation.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <span className="text-muted-foreground">•</span>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full capitalize",
                statusColors[quotation.status]
              )}
            >
              {quotation.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonCustom variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print
          </ButtonCustom>
          <ButtonCustom variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </ButtonCustom>
          {quotation.status === "draft" && (
            <ButtonCustom variant="premium" size="sm">
              <Send className="h-4 w-4 mr-2" /> Send Quotation
            </ButtonCustom>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Client
          </h3>
          <p className="text-xl font-medium">{quotation.clientName}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Amount
          </h3>
          <p className="text-3xl font-medium">
            ${finalAmount.toLocaleString()}
          </p>
          {hasDiscount && (
            <p className="text-sm text-muted-foreground mt-1">
              Includes {quotation.discountPercentage}% discount
            </p>
          )}
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 bg-muted/30 border-b">
          <h3 className="font-medium">Items</h3>
        </div>
        <div className="divide-y">
          <div className="px-6 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Item</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {quotation.items.map((item) => (
            <div
              key={item.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-6">
                <p className="font-medium">{item.name}</p>
              </div>
              <div className="col-span-2">{item.quantity}</div>
              <div className="col-span-2">${item.price.toLocaleString()}</div>
              <div className="col-span-2 text-right font-medium">
                ${(item.quantity * item.price).toLocaleString()}
              </div>
            </div>
          ))}

          <div className="px-6 py-4 flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${quotation.totalAmount.toLocaleString()}</span>
              </div>
              
              {hasDiscount && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount ({quotation.discountPercentage}%)</span>
                  <span>-${((quotation.totalAmount * quotation.discountPercentage!) / 100).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>${finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuotationDetail;
