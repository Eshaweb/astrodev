import { ErrorData } from '../Error/ErrorData';


export class LoadingSwitchService {
    public loading = false;
    public popupVisible = false;
    errorData: ErrorData[];
    message: string;

    ClosePopUp() {
        this.popupVisible = false;
    }
}