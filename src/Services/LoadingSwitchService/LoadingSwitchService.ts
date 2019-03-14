import { ErrorData } from '../Error/ErrorData';


export class LoadingSwitchService {
    public loading = false;
    public popupVisible = false;
    errorData: ErrorData[];
    message: string;
  title: string;

    ClosePopUp() {
        this.popupVisible = false;
    }
}