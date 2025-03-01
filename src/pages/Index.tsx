
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import QuotationList from "@/components/QuotationList";
import { ButtonCustom } from "@/components/ui/button-custom";
import { mockQuotations } from "@/lib/data";
import { FileText, Plus } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  const latestQuotations = mockQuotations.slice(0, 3);
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="page-container pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div 
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h1 className="page-title">Quotation Dashboard</h1>
                <p className="page-subtitle">Manage your quotations and proposals</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="section"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium">Latest Quotations</h2>
                  <ButtonCustom asChild variant="outline" size="sm">
                    <Link to="/quotations">View All</Link>
                  </ButtonCustom>
                </div>
                
                <QuotationList quotations={latestQuotations} />
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Create New Quotation</h2>
                    <p className="text-muted-foreground mb-4">
                      Create professional quotations for your clients in minutes.
                    </p>
                    <ButtonCustom asChild variant="premium" className="w-full">
                      <Link to="/create">
                        <Plus className="mr-2 h-4 w-4" /> New Quotation
                      </Link>
                    </ButtonCustom>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Quotation Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Total</span>
                          <span>{mockQuotations.length}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Accepted</span>
                          <span>{mockQuotations.filter(q => q.status === "accepted").length}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ 
                              width: `${(mockQuotations.filter(q => q.status === "accepted").length / mockQuotations.length) * 100}%` 
                            }} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Pending</span>
                          <span>{mockQuotations.filter(q => q.status === "sent" || q.status === "draft").length}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full" 
                            style={{ 
                              width: `${(mockQuotations.filter(q => q.status === "sent" || q.status === "draft").length / mockQuotations.length) * 100}%` 
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
