export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  gst: number;
  total: number;
}

export interface Invoice {
  customerName: string;
  customerNumber: string;
  invoiceNumber: string;
  reference: string;
  date: string;
  salesperson: string;
  items: InvoiceItem[];
  paymentMethod: string;
  fullyPaid: boolean;
  discount: number;
  adjustment: number;
  customerNotes: string;
}