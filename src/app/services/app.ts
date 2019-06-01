import { Injectable } from "@angular/core";
import { LocationEditComponent } from '../components/location-edit';

@Injectable()
export class AppService {

    // agree to terms and conditions?
    agreeTerms: boolean;    

    // current community settings
    community: any;
    name: string;

    // editing?
    locationEditor: LocationEditComponent;
}
