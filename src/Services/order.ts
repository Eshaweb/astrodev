import { Injectable } from '@angular/core';

export class Services {
    ID: number;
    ServiceName: string;
    ItActId: string;
}

let services: Services[] = [{
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
    getServices(): Services[] {
        return services;
    }
}
