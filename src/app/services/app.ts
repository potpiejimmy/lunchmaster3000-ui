import { Injectable } from "@angular/core";
import { LocationEditComponent } from '../components/location-edit';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {

    // agree to terms and conditions and privacy statement?
    agreeTerms: boolean;    
    agreePrivacy: boolean;

    // current community settings
    community: any;
    name: string;

    // editing?
    locationEditor: LocationEditComponent;

    // API URL
    get apiUrl() { return environment.apiUrl; }
}
