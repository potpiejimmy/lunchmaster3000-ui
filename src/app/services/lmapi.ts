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
}
