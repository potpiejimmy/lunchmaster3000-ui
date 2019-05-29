import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app';

@Component({
    selector: "location-edit",
    templateUrl: "location-edit.html"
})
export class LocationEditComponent {

    @ViewChild("scrollAnchor") scrollAnchor;

    location;

    constructor(
        public app: AppService
    ) {}

    editLocation(l: any): void {
        this.location = l;
        this.scrollAnchor.nativeElement.scrollIntoView({behavior: "smooth"});
    }

    cancel() {
        this.location = null;
    }
}
