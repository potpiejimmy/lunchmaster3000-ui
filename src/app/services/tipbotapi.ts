import { Injectable } from "@angular/core";
import { HttpBaseService } from './httpbase';
import { environment } from '../../environments/environment';

@Injectable()
export class TipbotApiService extends HttpBaseService {

    tipUser(to: string, network: string): Promise<any> {
        return this.post(environment.apiUrl+"tipbot/sendTip", { to: to, network: network});
    }
}
