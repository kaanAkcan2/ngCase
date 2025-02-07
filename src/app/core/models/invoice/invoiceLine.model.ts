export interface InvoiceLine {
    id?: string;
    itemName?: string;
    quantity?: number;
    price?: number;
    userId?: string;
    recordDate?: Date;    
}

export type InvoiceLines = InvoiceLine[];