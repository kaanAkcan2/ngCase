export interface Customer {
    id?: string;
    taxNumber?: string;
    title?: string;
    address?: string;
    eMail?: string;
    userId?: string;
    recordDate?: Date;
}

export type Customers = Customer[];