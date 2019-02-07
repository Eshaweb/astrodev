import { PayCode } from "./PayCode";

export interface SalesModel{
    PartyMastId:string;
    Amount:number;
    BillDiscountCode:string;
    Remarks:string;
    PayCodes:PayCode[];
    ServtrDets:ServtrDet[];
    OrderId:string;
}


export interface ServtrDet{
    ItMastId:string;
    FreeAmount:number;
    ItemAmount:number;
}

