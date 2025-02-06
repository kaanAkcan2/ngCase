import { InvoiceLines } from "./invoiceLine.model";

export interface Invoice {
    id?: string;
    customerId?: string;
    invoiceNumber?: number;
    invoiceDate?: Date;
    totalAmount?: number;
    userId?: string;
    recordDate?: Date;
    invoiceLines?: InvoiceLines;
}

export type Invoices = Invoice[];