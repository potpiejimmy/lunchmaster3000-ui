import { Component, ViewChild } from "@angular/core";
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm-dialog';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
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
        public dialog: MatDialog,
        public app: AppService,
        private api: LmApiService,
        private translate: TranslateService
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

    get decimalSeparator(): string {
        return (1.1).toLocaleString().substring(1, 2);
    }

    get thousandsSeparator(): string {
        return (1000).toLocaleString().substring(1, 2);
    }

    async confirmDialogDelete(): Promise<void> {
        let header = await this.translate.get("components.location_edit.confirm_deletion_header").toPromise();
        let question = await this.translate.get("components.location_edit.confirm_deletion_question").toPromise();
        question += this.origName + "?";

        let yes = await this.translate.get("components.location_edit.confirm_deletion_yes").toPromise();
        let no = await this.translate.get("components.location_edit.confirm_deletion_no").toPromise();
        
        const dialogData = new ConfirmDialogModel(header, question, no, yes);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult)
                this.delete();
        });
    }
}
