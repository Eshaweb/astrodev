export class  ErrorData{
    errorMessage?:string;
    errorContainer?:ErrorContainer[];
    modelError?:ModelError[];
}

export class ModelError{
    Property:string;
    Error:string;
}

export class ErrorContainer{
    ErrorName : string;
}