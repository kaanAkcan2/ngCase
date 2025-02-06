export interface Customer {
    id: String;
    taxNumber: String;
    title: String;
    address: String;
    eMail: String;
    userId: String;
    recordDate: Date;
}

export type Customers = Customer[];