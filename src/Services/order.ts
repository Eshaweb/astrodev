import { Injectable } from '@angular/core';

export class Company {
    ID: number;
    ServiceName: string;
    ItActId: string;
}

let companies: Company[] = [{
    "ID": 1,
    "ServiceName": "Horoscope",
    "ItActId": "#SH",
}, {
    "ID": 2,
    "ServiceName": "Match Making",
    "ItActId": "#SM"
}, {
    "ID": 3,
    "ServiceName": "AstaMangala",
    "ItActId": "#SA"
}, {
    "ID": 4,
    "ServiceName": "Numerology",
    "ItActId": "#NM"
},{
    "ID": 5,
    "ServiceName": "Muhurtha",
    "ItActId": "#MU"}
];

@Injectable()
export class OrderHistoryService {
    getCompanies(): Company[] {
        return companies;
    }
}
