import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../../../../core/models/invoice/invoice.model';
import { ApiHttpService } from '../../../../core/services/apiHttp.service';
import { InvoiceLine } from '../../../../core/models/invoice/invoiceLine.model';
import { Customer } from '../../../../core/models/customer/customer.model';
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';

declare var bootstrap: any;
@Component({
    selector: 'invoice-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    standalone: false
})
export class IndexComponent {

    constructor(private router: Router,
        private apiHttpService: ApiHttpService,
    ) { }

    currency: string = "tl";

    isUpdate: boolean = false;

    invoices: Invoice[] = [
        {
            id: '1',
            customerId: 'C001',
            invoiceNumber: '1001',
            invoiceDate: new Date('2025-01-01'),
            totalAmount: 150.75,
            userId: 'U001',
            recordDate: new Date('2025-01-01'),
        },
        {
            id: '12',
            customerId: 'C002',
            invoiceNumber: '1002',
            invoiceDate: new Date('2025-01-02'),
            totalAmount: 200.50,
            userId: 'U002',
            recordDate: new Date('2025-01-02'),
        },
        // Diğer faturalara da benzer şekilde ekleme yapılabilir
    ];

    newInvoiceObject: Invoice = {
        invoiceDate: new Date(),
        userId: '88888888-8888-8888-8888-888888888888',
    };

    newInvoiceLineObject: InvoiceLine = {
        recordDate: new Date(),
        userId: '88888888-8888-8888-8888-888888888888',
    }

    newCustomerObject: Customer = {
        recordDate: new Date(),
    };

    currentInvoice: Invoice = { ...this.newInvoiceObject };

    currentInvoiceLine: InvoiceLine = { ...this.newInvoiceLineObject };

    modalInstance: any;

    ngOnInit(): void {

        const modalElement = document.getElementById('exampleModal');
        this.modalInstance = new bootstrap.Modal(modalElement);

        this.getList();

        if (this.newInvoiceObject.customer == null || this.newInvoiceObject.customer == undefined) {
            this.newInvoiceObject.customer = this.newCustomerObject;
        }

        this.InvoiceLListSubject.next([]);
    }

    getList() {
        let dataToPost = { startDate: null, endDate: null };

        this.apiHttpService.post<Invoice[]>("invoice/get-invoice-list", dataToPost)
            .subscribe(
                (data) => {
                    this.invoices = data;
                },
                (error) => console.log('List getirilmedi')
            );
    }

    openModalWithInvoice(invoice: Invoice) {
        this.isUpdate = true;

        if (this.modalInstance) {
            this.currentInvoice = invoice;
            this.modalInstance.show(); // Modal'ı açıyoruz
        }
    }

    openModalWithoutInvoice() {
        this.isUpdate = false;

        if (this.modalInstance) {
            this.currentInvoice = { ...this.newInvoiceObject };
            this.modalInstance.show(); // Modal'ı açıyoruz
        }
    }

    closeModal() {
        if (this.modalInstance) {
            this.modalInstance.hide(); // Modal'ı kapatıyoruz
        }
    }

    onSubmit() {
        console.log(this.currentInvoice);

        let dataToPost = { ...this.currentInvoice };

        this.InvoiceLListSubject.next([]);
        
        if (this.isUpdate) {
            this.apiHttpService.put<Invoice[]>("invoice", dataToPost)
                .subscribe(
                    (data) => {
                        this.router.navigate(['/invoice']);
                    },
                    (error) => console.log('List getirilmedi')
                );
        } else {
            this.apiHttpService.post<Invoice[]>("invoice", dataToPost)
                .subscribe(
                    (data) => {
                        this.router.navigate(['/invoice']);
                    },
                    (error) => console.log('List getirilmedi')
                );
        }

       
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }

    deleteInvoice(invoice: Invoice) {
        this.apiHttpService.delete<Invoice>("invoice?id=" + invoice.id)
            .subscribe(
                (data) => {
                    this.router.navigate(['/invoice']);
                },
                (error) => console.log('List getirilmedi')
            );
    }

    addInvoiceLine() {
        console.log(this.currentInvoiceLine);

        if (this.currentInvoice.invoiceLines == undefined || this.currentInvoice.invoiceLines == null || this.currentInvoice.invoiceLines.length < 1)
            this.currentInvoice.invoiceLines = [{ ...this.currentInvoiceLine }];
        else
            this.currentInvoice.invoiceLines.push({ ...this.currentInvoiceLine });

        this.currentInvoiceLine = { ...this.newInvoiceLineObject };

        console.log(this.currentInvoice);
    }

    private InvoiceLListSubject = new BehaviorSubject<Invoice[]>([]);

    private getInvoiceList(): any {

    }

    InvoiceList$(): Observable<any> {
        return this.InvoiceLListSubject.asObservable()
            .pipe(
                filter(Boolean),
                switchMap(x => {


                    let dataToPost = { startDate: null, endDate: null };

                    return this.apiHttpService.post<any>("invoice/get-invoice-list", dataToPost)
                        .pipe(
                            filter(Boolean),
                            tap(x => {
                                this.invoices = x.data;
                            })


                        );


                }),
            );
    }
}