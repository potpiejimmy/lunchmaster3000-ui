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

    createOrderSet(location: string, name: string): Promise<any> {
        return this.post(environment.apiUrl+"ordersets", {
            location: location, name: name
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

    updateOrderSetComment(id: string, comment: string) {
        return this.put(environment.apiUrl+"ordersets/"+id, {
            comment: comment ? comment: " "
        });
    }

    setOrder(ordersetId: string, name: string, order: string) {
        return this.post(environment.apiUrl+"orders", {
            ordersetId: ordersetId, name: name, order: order
        });
    }
}
