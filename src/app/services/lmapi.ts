import { Injectable } from "@angular/core";
import { HttpBaseService } from './httpbase';
import { environment } from '../../environments/environment';

@Injectable()
export class LmApiService extends HttpBaseService {

    createCommunity(community: any): Promise<any> {
        return this.post(environment.apiUrl+"communities", community);
    }

    getCommunity(id: string): Promise<any> {
        return this.get(environment.apiUrl+"communities/"+id);
    }

    getData(): Promise<any> {
        return this.get(environment.apiUrl+"data?id="+this.localStorage.get("id"));
    }

    saveLocation(location: any): Promise<any> {
        return this.post(environment.apiUrl+"locations?id="+this.localStorage.get("id"), location);
    }

    deleteLocation(location: any): Promise<any> {
        return this.delete(environment.apiUrl+"locations/"+location.id+"?id="+this.localStorage.get("id"));
    }

    setFavorite(locationId: number, name: string, checked: boolean): Promise<any> {
        return this.post(environment.apiUrl+"favorites?id="+this.localStorage.get("id"), {
            locationId: locationId, name: name, checked: checked
        });
    }

    createOrderSet(location: any, name: string, payLink: string): Promise<any> {
        return this.post(environment.apiUrl+"ordersets?id="+this.localStorage.get("id"), {
            location: location, name: name, payLink: payLink
        });
    }

    deleteOrderSet(id: string): Promise<any> {
        return this.delete(environment.apiUrl+"ordersets/"+id+"?id="+this.localStorage.get("id"));
    }

    updateOrderSet(id: string, finish: boolean = false, arrive: boolean = false): Promise<any> {
        return this.put(environment.apiUrl+"ordersets/"+id+"?id="+this.localStorage.get("id"), {
            finish: finish, arrive: arrive
        });
    }

    updateOrderSetComment(id: string, orderSet: any) {
        return this.put(environment.apiUrl+"ordersets/"+id+"?id="+this.localStorage.get("id"), orderSet);
    }

    setOrder(ordersetId: string, name: string, order: any) {
        return this.post(environment.apiUrl+"orders?id="+this.localStorage.get("id"), {
            ordersetId: ordersetId, name: name, order: order
        });
    }

    sendChatMsg(ordersetId: string, name: string, msg: string) {
        return this.post(environment.apiUrl+"ordersets/"+ordersetId+"/chat?id="+this.localStorage.get("id"), {
            name: name, msg: msg
        });
    }
}
