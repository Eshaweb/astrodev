import { Component } from '@angular/core';
import { OrderHistoryService, Company } from 'src/Services/order';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';



@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
    companies: Company[];
    fields: SelectBoxModel[] = [
        { Id: "STANDARD", Text: 'Date' },
        { Id: "SUMMER", Text: 'Amount' },
        { Id: "DOUBLE", Text: 'Status' }
    ];
    sortorders: SelectBoxModel[] = [
        { Id: "A", Text: 'Ascending Order' },
        { Id: "D", Text: 'Descending Order' }
    ];
    sortorderdata_horoscope: ArrayStore;
    sortorderdata_matchMaking: ArrayStore;
    sortorderdata_astamangala: ArrayStore;
    sortorderdata_numerology: ArrayStore;
    fielddata_horoscope: ArrayStore;
    fielddata_matchMaking: ArrayStore;
    fielddata_astamangala: ArrayStore;
    fielddata_numerology: ArrayStore;
    fieldvalue_horoscope: string;
    fieldvalue_matchMaking: string;
    fieldvalue_astamangala: string;
    fieldvalue_numerology: string;

    sortordervalue_horoscope: string;
    sortordervalue_matchMaking: string;
    sortordervalue_astamangala: string;
    sortordervalue_numerology: string;
    fieldvalue: any;
    sortordervalue: any;
    fielddata: ArrayStore;
    sortorderdata: ArrayStore;

    constructor(service: OrderHistoryService) {
        this.companies = service.getCompanies();
        this.fielddata = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.fielddata_horoscope = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata_horoscope = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.sortorderdata_matchMaking = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.fielddata_matchMaking = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata_astamangala = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.fielddata_astamangala = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.sortorderdata_numerology = new ArrayStore({
            data: this.sortorders,
            key: "Id"
        });
        this.fielddata_numerology = new ArrayStore({
            data: this.fields,
            key: "Id"
        });
        this.fieldvalue = this.fields[0].Id;
        this.sortordervalue = this.sortorders[0].Id;
        this.fieldvalue_horoscope = this.fields[0].Id;
        this.sortordervalue_horoscope = this.sortorders[0].Id;
    }
    onItemClick(event){

    }
    fielddataSelection(event) {
        this.fieldvalue = event.value;
    }
    sortorderdataSelection(event) {
        this.sortordervalue = event.value;
    }
    fielddataSelection_horoscope(event) {
        this.fieldvalue_horoscope = event.value;
    }
    sortorderdataSelection_horoscope(event) {
        this.sortordervalue_horoscope = event.value;
    }
    fielddataSelection_matchMaking(event) {
        this.fieldvalue_matchMaking = event.value;
    }
    sortorderdataSelection_matchMaking(event) {
        this.sortordervalue_matchMaking = event.value;
    }
    fielddataSelection_astamangala(event) {
        this.fieldvalue_astamangala = event.value;
    }
    sortorderdataSelection_astamangala(event) {
        this.sortordervalue_astamangala = event.value;
    }
    fielddataSelection_numerology(event) {
        this.fieldvalue_numerology = event.value;
    }
    sortorderdataSelection_numerology(event) {
        this.sortordervalue_numerology = event.value;
    }
}

