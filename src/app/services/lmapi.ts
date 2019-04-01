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

    createOrderSet(location: string, name: string, payLink: string): Promise<any> {
        return this.post(environment.apiUrl+"ordersets", {
            location: location, name: name, payLink: payLink
        });
    }

    deleteOrderSet(id: string): Promise<any> {
        return this.delete(environment.apiUrl+"ordersets/"+id);
    }

    updateOrderSet(id: string, finish: boolean = false, arrive: boolean = false): Promise<any> {
        return this.put(environment.apiUrl+"ordersets/"+id, {
            finish: finish, arrive: arrive
        });
    }

    updateOrderSetComment(id: string, orderSet: any) {
        return this.put(environment.apiUrl+"ordersets/"+id, orderSet);
    }

    setOrder(ordersetId: string, name: string, order: any) {
        return this.post(environment.apiUrl+"orders", {
            ordersetId: ordersetId, name: name, order: order
        });
    }
}
