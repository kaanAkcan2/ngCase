import { Customer } from "../customer/customer.model";
import { InvoiceLines } from "./invoiceLine.model";

export interface Invoice {
    id?: string;
    customerId?: string;
    invoiceNumber?: string;
    invoiceDate?: Date;
    totalAmount?: number;
    userId?: string;
    customer?: Customer;
    recordDate?: Date;
    invoiceLines?: InvoiceLines;
}

export type Invoices = Invoice[];