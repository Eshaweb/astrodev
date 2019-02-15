export class NumerologyResponse {

    Predictions: Predictions[] = [];
    Month: string;
}


export class Predictions {
    Title: string;
    SubTitle: string;
    Prediction: string;
}

export class SerialseMonth {
    Order: string;
    Caption: string;
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
}