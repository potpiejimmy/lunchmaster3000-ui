import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app';

@Component({
    selector: "location-edit",
    templateUrl: "location-edit.html"
})
export class LocationEditComponent {

    @ViewChild("scrollAnchor") scrollAnchor;
    @ViewChild('inpname') inpname;

    location;

    constructor(
        public app: AppService
    ) {}

    editLocation(l: any): void {
        this.location = JSON.parse(JSON.stringify(l));
        this.scrollAnchor.nativeElement.scrollIntoView({behavior: "smooth"});
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 200);
    }

    newLocation(): void {
        this.editLocation({});
    }

    cancel() {
        this.location = null;
    }
}
