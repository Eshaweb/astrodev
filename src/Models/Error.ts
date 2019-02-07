export class Error{
    ErrorString:string;
    InnerMesage:string;
    Suggestion:string;
    Type:ErrorType;
}
export class Errors{
    Errors:Error[];
}
export enum ErrorType{
Error=1,Warning=2, Info=3,Suggestion=4
}