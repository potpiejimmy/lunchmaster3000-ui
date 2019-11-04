import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ConfirmDialogModel, ConfirmDialogComponent } from '../components/confirm-dialog'
import { MatDialog } from '@angular/material';
import { AppService } from '../services/app';
import { LocalStorageService } from 'angular-2-local-storage';
import { DeferredValue } from '../util/DeferredValue';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "settings",
    templateUrl: "settings.html"
})
export class SettingsComponent implements OnInit, AfterViewInit {
    
    nameInput: DeferredValue;

    constructor(
        public dialog: MatDialog,
        public app: AppService,
        private localStorage: LocalStorageService,
        private router: Router,
        private translate: TranslateService
    ) {
        this.nameInput = new DeferredValue(1000, n => this.setName(n));
    }

    ngOnInit() {
        if (!this.app.community) this.router.navigate(['/'], { replaceUrl: true });
        this.nameInput._value = this.localStorage.get("name");
    }

    ngAfterViewInit() {
    }

    setName(v: string) {
        console.log("Storing name: " + v);
        this.localStorage.set("name", v);
    }

    leaveCommunity() {
        this.localStorage.remove("id");
        this.app.community = null;
        this.app.name = null; // do no show name until joined
        this.router.navigate(['/']);
    }

    async confirmDialogLeaving(): Promise<void> {
        let header = await this.translate.get("routes.settings.confirm_deletion_header").toPromise();
        let question = await this.translate.get("routes.settings.confirm_deletion_question").toPromise();
        question += this.app.community.name + "?";

        let yes = await this.translate.get("routes.settings.confirm_deletion_yes").toPromise();
        let no = await this.translate.get("routes.settings.confirm_deletion_no").toPromise();
        
        const dialogData = new ConfirmDialogModel(header, question, no, yes);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            width: "90%",
            data: dialogData,
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult)
                this.leaveCommunity();
        });
    }
}
