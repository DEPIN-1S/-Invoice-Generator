import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  imports: [CommonModule, CurrencyPipe],
  standalone: true
})
export class InvoicePreviewComponent implements OnInit {
  invoice: Invoice;
  totals: { subtotal: number, totalTax: number, grandTotal: number };

  constructor(private invoiceService: InvoiceService) {
    this.invoice = this.invoiceService.getInvoice();
    this.totals = this.invoiceService.calculateInvoice(this.invoice);
  }

  ngOnInit(): void {}

  onPrint(): void {
    window.print();
  }
}