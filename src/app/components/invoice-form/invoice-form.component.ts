import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe]
})
export class InvoiceFormComponent implements OnInit {
  invoice: Invoice;
  totals: { subtotal: number, totalTax: number, grandTotal: number };
  private originalInvoice: Invoice;

  constructor(private invoiceService: InvoiceService, private router: Router) {
    this.invoice = this.deepCopy(this.invoiceService.getInvoice());
    this.originalInvoice = this.deepCopy(this.invoice);
    this.totals = this.invoiceService.calculateInvoice(this.invoice);
  }

  ngOnInit(): void {
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totals = this.invoiceService.calculateInvoice(this.invoice);
  }

  onSave(): void {
    this.invoiceService.saveInvoice(this.invoice);
    this.originalInvoice = this.deepCopy(this.invoice);
    this.calculateTotals();
  }

  onSaveAndPrint(): void {
    this.invoiceService.saveInvoice(this.invoice);
    this.originalInvoice = this.deepCopy(this.invoice);
    this.router.navigate(['/preview']);
  }

  onCancel(): void {
    this.invoice = this.deepCopy(this.originalInvoice);
    this.calculateTotals();
  }

  addItem(): void {
    this.invoice.items.push({
      description: '',
      quantity: 1,
      rate: 0,
      gst: 0,
      total: 0
    });
    this.calculateTotals();
  }

  deleteItem(index: number): void {
    this.invoice.items.splice(index, 1);
    this.calculateTotals();
  }

  private deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}