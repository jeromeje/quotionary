
import { Quotation } from "./types";

export const mockQuotations: Quotation[] = [
  {
    id: "q1",
    clientName: "Acme Corporation",
    items: [
      { id: "i1", name: "Website Design", quantity: 1, price: 2500 },
      { id: "i2", name: "SEO Package", quantity: 1, price: 1200 },
      { id: "i3", name: "Content Creation", quantity: 10, price: 120 },
    ],
    totalAmount: 4900,
    date: "2023-04-15",
    status: "sent",
  },
  {
    id: "q2",
    clientName: "TechStart Inc.",
    items: [
      { id: "i4", name: "Mobile App Development", quantity: 1, price: 8000 },
      { id: "i5", name: "UI/UX Design", quantity: 1, price: 1500 },
    ],
    totalAmount: 9500,
    date: "2023-04-12",
    status: "accepted",
  },
  {
    id: "q3",
    clientName: "Global Enterprises",
    items: [
      { id: "i6", name: "Server Maintenance", quantity: 12, price: 400 },
      { id: "i7", name: "Security Audit", quantity: 1, price: 3000 },
      { id: "i8", name: "Data Backup Service", quantity: 1, price: 800 },
    ],
    totalAmount: 8600,
    date: "2023-04-10",
    status: "draft",
  },
  {
    id: "q4",
    clientName: "Innovate Solutions",
    items: [
      { id: "i9", name: "Consulting Services", quantity: 20, price: 150 },
      { id: "i10", name: "Market Research", quantity: 1, price: 2500 },
    ],
    totalAmount: 5500,
    date: "2023-04-05",
    status: "declined",
  },
  {
    id: "q5",
    clientName: "Future Technologies",
    items: [
      { id: "i11", name: "Hardware Installation", quantity: 5, price: 600 },
      { id: "i12", name: "Training Session", quantity: 3, price: 800 },
    ],
    totalAmount: 5400,
    date: "2023-04-02",
    status: "sent",
  },
];

export function getQuotationById(id: string): Quotation | undefined {
  return mockQuotations.find(quotation => quotation.id === id);
}
