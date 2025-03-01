
import React from "react";
import Navbar from "@/components/Navbar";
import QuotationForm from "@/components/QuotationForm";
import PageTransition from "@/components/PageTransition";

const CreateQuotation = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="page-container pt-28">
          <div className="page-header">
            <h1 className="page-title">Create New Quotation</h1>
            <p className="page-subtitle">Create a professional quotation for your client</p>
          </div>
          
          <div className="max-w-4xl">
            <QuotationForm />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateQuotation;
