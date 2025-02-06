import { InvoiceLines } from "./invoiceLine.model";

export interface Invoice {
    id?: String;
    customerId?: String;
    invoiceNumber?: Number;
    invoiceDate?: Date;
    totalAmount?: Number;
    userId?: String;
    recordDate?: Date;
    invoiceLines?: InvoiceLines;
}

export type Invoices = Invoice[];