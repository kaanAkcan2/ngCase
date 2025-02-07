export interface InvoiceLine {
    id?: String;
    itemName?: String;
    quantity?: Number;
    price?: Number;
    userId?: String;
    recordDate?: Date;    
}

export type InvoiceLines = InvoiceLine[];