// Invoice Service for managing invoice data and calculations
import { Injectable } from '@angular/core';
import { Invoice, InvoiceItem } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoice: Invoice = {
    customerName: 'John',
    customerNumber: '9876543210',
    invoiceNumber: 'INV-78784',
    reference: 'REF-54879',
    date: '2025-07-11',
    salesperson: 'Priya Sharma',
    items: [
      { description: 'Blue Denim Jeans', quantity: 2, rate: 1299, gst: 5, total: 0 },
      { description: 'Casual White Shirt', quantity: 1, rate: 899, gst: 5, total: 0 },
      { description: 'Leather Wallet', quantity: 1, rate: 499, gst: 12, total: 0 }
    ],
    paymentMethod: 'UPI',
    fullyPaid: true,
    discount: 10,
    adjustment: 0,
    customerNotes: 'Thank you for shopping with us! Visit again.'
  };

  getInvoice(): Invoice {
    return { ...this.invoice, items: [...this.invoice.items] };
  }

  calculateInvoice(invoice?: Invoice): { subtotal: number, totalTax: number, grandTotal: number } {
    const targetInvoice = invoice || this.invoice;
    let subtotal = 0;
    let totalTax = 0;

    targetInvoice.items.forEach(item => {
      item.total = item.quantity * item.rate;
      subtotal += item.total;
      totalTax += (item.total * item.gst) / 100;
    });

    const discountAmount = (subtotal * targetInvoice.discount) / 100;
    const grandTotal = subtotal + totalTax - discountAmount + targetInvoice.adjustment;

    return { subtotal, totalTax, grandTotal };
  }

  saveInvoice(invoice: Invoice): void {
    this.invoice = { ...invoice, items: [...invoice.items] };
  }
}