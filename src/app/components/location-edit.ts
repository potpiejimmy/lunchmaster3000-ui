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

    constructor(
        public app: AppService,
        private api: LmApiService
    ) {}

    editLocation(l: any): void {
        this.origName = l.name;
        this.location = JSON.parse(JSON.stringify(l));
        delete this.location.votes;
        delete this.location.created;
        this.scrollAnchor.nativeElement.scrollIntoView({behavior: "smooth"});
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 200);
    }

    newLocation(): void {
        this.editLocation({});
    }

    cancel() {
        this.location = null;
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
}
