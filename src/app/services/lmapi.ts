import { Injectable } from "@angular/core";
import { HttpBaseService } from './httpbase';
import { environment } from '../../environments/environment';

@Injectable()
export class LmApiService extends HttpBaseService {

    getData(): Promise<any> {
        return this.get(environment.apiUrl+"data");
    }

    setFavorite(location: string, name: string, checked: boolean): Promise<any> {
        return this.post(environment.apiUrl+"favorites", {
            location: location, name: name, checked: checked
        });
    }

    setOrderSet(location: string, name: string, cancel: boolean = false, finish: boolean = false, arrive: boolean = false): Promise<any> {
        return this.post(environment.apiUrl+"ordersets", {
            location: location, name: name, cancel: cancel, finish: finish, arrive: arrive
        });
    }

    setOrderSetComment(orderset: any, comment: string) {
        return this.post(environment.apiUrl+"ordersets", {
            location: orderset.location, name: orderset.name, comment: comment ? comment: " "
        });
    }

    setOrder(orderset: any, name: string, order: string) {
        return this.post(environment.apiUrl+"orders", {
            orderset: orderset, name: name, order: order
        });
    }
}
