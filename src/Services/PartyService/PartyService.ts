import { Injectable } from "@angular/core";
import { Party } from "../../Models/Party/Party";



@Injectable()
export class PartyService {
    party: Party;
    Token:string=null;
    constructor(){
        //this.party.Token="1234";

    }
}
