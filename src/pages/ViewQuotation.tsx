
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import QuotationDetail from "@/components/QuotationDetail";
import { getQuotationById } from "@/lib/data";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowLeft } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import PageTransition from "@/components/PageTransition";

const ViewQuotation = () => {
  const { id } = useParams<{ id: string }>();
  const quotation = id ? getQuotationById(id) : undefined;

  if (!quotation) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Navbar />
          
          <div className="page-container pt-28">
            <ButtonCustom asChild variant="outline" size="sm" className="mb-8">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
              </Link>
            </ButtonCustom>
            
            <EmptyState
              title="Quotation not found"
              description="The quotation you're looking for doesn't exist or has been removed."
              ctaText="Go to Dashboard"
              ctaLink="/"
              className="min-h-[400px]"
            />
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="page-container pt-28">
          <ButtonCustom asChild variant="outline" size="sm" className="mb-8">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </ButtonCustom>
          
          <QuotationDetail quotation={quotation} />
        </div>
      </div>
    </PageTransition>
  );
};

export default ViewQuotation;
