import { Component, ViewChild } from "@angular/core";
import { AppService } from '../services/app';
import { LmApiService } from '../services/lmapi';

@Component({
    selector: "location-edit",
    templateUrl: "location-edit.html"
})
export class LocationEditComponent {

    @ViewChild("scrollAnchor") scrollAnchor;
    @ViewChild('inpname') inpname;

    location: any;
    origName: string;
    processing: boolean;
    showCropper = false;
    imageChangedEvent: any;

    constructor(
        public app: AppService,
        private api: LmApiService
    ) {}

    editLocation(l: any): void {
        this.origName = l.name;
        this.location = JSON.parse(JSON.stringify(l));
        delete this.location.votes;
        delete this.location.created;
        setTimeout(() => this.scrollAnchor.nativeElement.scrollIntoView({behavior: "smooth"}), 100);
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), l.name ? 900 : 400); // doing this a little later to not interfere with the smooth scrollling
    }

    newLocation(): void {
        this.editLocation({});
    }

    cancel() {
        this.location = null;
        this.showCropper = false;
        this.imageChangedEvent = null;
    }

    async save() {
        this.process(this.api.saveLocation(this.location));
    }

    async delete() {
        this.process(this.api.deleteLocation(this.location));
    }

    async process(processor: Promise<any>) {
        this.processing = true;
        try {
            await processor;
        } finally {
            this.processing = false;
        }
        this.cancel();
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageChangeEvent(event: any) {
        // add newIcon property:
        this.location.newIcon = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

}
