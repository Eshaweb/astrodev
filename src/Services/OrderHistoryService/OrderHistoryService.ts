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
    "ServiceName": "Matchmaking",
    "ItActId": "#SM"
}, {
    "ID": 3,
    "ServiceName": "AshtaMangala",
    "ItActId": "#SA"
}, {
    "ID": 4,
    "ServiceName": "Nithya Panchanga",
    "ItActId": "#PAN"
},{
    "ID": 5,
    "ServiceName": "Numerology",
    "ItActId": "#NM"
},{
    "ID": 6,
    "ServiceName": "Muhurtha",
    "ItActId": "#MU"
},{
    "ID": 7,
    "ServiceName": "Wallet",
    "ItActId": "#W"
},{
    "ID": 8,
    "ServiceName": "Android Products",
    "ItActId": "#AND"
},{
    "ID": 9,
    "ServiceName": "Windows Product",
    "ItActId": "#WIN"
}
];

@Injectable()
export class OrderHistoryService {
    getServices(): Services[] {
        return services;
    }
}
