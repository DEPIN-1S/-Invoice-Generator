
import { Routes } from '@angular/router';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';

export const routes: Routes = [
  { path: '', component: InvoiceFormComponent },
  { path: 'preview', component: InvoicePreviewComponent }
];