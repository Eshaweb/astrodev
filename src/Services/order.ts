import { Injectable } from '@angular/core';

export class Company {
    ID: number;
    CompanyName: string;
    Address: string;
    City: string;
    State: string;
    Zipcode: number;
    Phone: string;
    ItActId: string;
    Website: string;
}

let companies: Company[] = [{
    "ID": 1,
    "CompanyName": "Horoscope",
    "Address": "702 SW 8th Street",
    "City": "Bentonville",
    "State": "Arkansas",
    "Zipcode": 72716,
    "Phone": "(800) 555-2797",
    "ItActId": "#SH",
    "Website": "http://www.nowebsitesupermart.com"
}, {
    "ID": 2,
    "CompanyName": "Match Making",
    "Address": "2455 Paces Ferry Road NW",
    "City": "Atlanta",
    "State": "Georgia",
    "Zipcode": 30339,
    "Phone": "(800) 595-3232",
    "ItActId": "#SM",
    "Website": "http://www.nowebsitedepot.com"
}, {
    "ID": 3,
    "CompanyName": "AstaMangala",
    "Address": "1000 Nicllet Mall",
    "City": "Minneapolis",
    "State": "Minnesota",
    "Zipcode": 55403,
    "Phone": "(612) 304-6073",
    "ItActId": "#SA",
    "Website": "http://www.nowebsitemusic.com"
}, {
    "ID": 4,
    "CompanyName": "Numerology",
    "Address": "999 Lake Drive",
    "City": "Issaquah",
    "State": "Washington",
    "Zipcode": 98027,
    "Phone": "(800) 955-2292",
    "ItActId": "#NM",
    "Website": "http://www.nowebsitetomsclub.com"
}];

@Injectable()
export class OrderHistoryService {
    getCompanies(): Company[] {
        return companies;
    }
}