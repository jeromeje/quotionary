
export interface QuotationItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Quotation {
  id: string;
  clientName: string;
  items: QuotationItem[];
  totalAmount: number;
  date: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
}
