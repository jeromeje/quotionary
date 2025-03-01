
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Quotation } from "@/lib/types";
import { ButtonCustom } from "./ui/button-custom";
import { Card } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState from "./EmptyState";

interface QuotationListProps {
  quotations: Quotation[];
}

const QuotationList: React.FC<QuotationListProps> = ({ quotations }) => {
  const [filter, setFilter] = useState<string>("all");

  const filteredQuotations = quotations.filter((quotation) => {
    if (filter === "all") return true;
    return quotation.status === filter;
  });

  const statusColors = {
    draft: "bg-blue-100 text-blue-800",
    sent: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };

  if (quotations.length === 0) {
    return (
      <EmptyState
        title="No quotations yet"
        description="Create your first quotation to get started"
        ctaText="Create Quotation"
        ctaLink="/create"
        icon={<FileText className="h-12 w-12" />}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-wrap gap-2">
        <FilterButton 
          active={filter === "all"} 
          onClick={() => setFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton 
          active={filter === "draft"} 
          onClick={() => setFilter("draft")}
        >
          Drafts
        </FilterButton>
        <FilterButton 
          active={filter === "sent"} 
          onClick={() => setFilter("sent")}
        >
          Sent
        </FilterButton>
        <FilterButton 
          active={filter === "accepted"} 
          onClick={() => setFilter("accepted")}
        >
          Accepted
        </FilterButton>
        <FilterButton 
          active={filter === "declined"} 
          onClick={() => setFilter("declined")}
        >
          Declined
        </FilterButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotations.map((quotation, index) => (
          <motion.div
            key={quotation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      {quotation.clientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(quotation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full capitalize",
                      statusColors[quotation.status]
                    )}
                  >
                    {quotation.status}
                  </span>
                </div>

                <p className="text-2xl font-medium mb-4">
                  ${quotation.totalAmount.toLocaleString()}
                </p>

                <div className="text-sm text-muted-foreground mb-4">
                  <p>{quotation.items.length} items</p>
                </div>

                <div className="flex justify-between gap-2">
                  <ButtonCustom asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/view/${quotation.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Link>
                  </ButtonCustom>
                  <ButtonCustom variant="subtle" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" /> PDF
                  </ButtonCustom>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm rounded-full transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
    >
      {children}
    </button>
  );
};

export default QuotationList;
