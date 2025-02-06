import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../../../../core/models/invoice/invoice.model';

declare var bootstrap: any;
@Component({
    selector: 'invoice-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    standalone: false
})
export class IndexComponent {

    currency: string = "tl";
    invoices: Invoice[] = [
        {
            id: '1',
            customerId: 'C001',
            invoiceNumber: 1001,
            invoiceDate: new Date('2025-01-01'),
            totalAmount: 150.75,
            userId: 'U001',
            recordDate: new Date('2025-01-01'),
        },
        {
            id: '12',
            customerId: 'C002',
            invoiceNumber: 1002,
            invoiceDate: new Date('2025-01-02'),
            totalAmount: 200.50,
            userId: 'U002',
            recordDate: new Date('2025-01-02'),
        },
        // Diğer faturalara da benzer şekilde ekleme yapılabilir
    ];
    currentInvoice: Invoice | null = null;


    modalInstance: any;

    ngAfterViewInit(): void {

        const modalElement = document.getElementById('exampleModal');
        this.modalInstance = new bootstrap.Modal(modalElement); // Bootstrap modal instance'ını oluşturuyoruz.
    }

    openModalWithInvoice(invoice: Invoice) {
        if (this.modalInstance) {
            this.currentInvoice = invoice;
            this.modalInstance.show(); // Modal'ı açıyoruz
        }
    }

    closeModal() {
        if (this.modalInstance) {
            this.modalInstance.hide(); // Modal'ı kapatıyoruz
        }
    }
}