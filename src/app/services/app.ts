import { Injectable } from "@angular/core";
import { LocationEditComponent } from '../components/location-edit';

@Injectable()
export class AppService {
    // current community settings
    community;
    name;

    // editing?
    locationEditor: LocationEditComponent;
}
