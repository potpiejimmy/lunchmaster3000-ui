import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TipbotApiService } from '../services/tipbotapi';

@Component({
    selector: "xrptip",
    templateUrl: "xrptip.html"
})

export class XrpTipComponent {
    @ViewChild('inphandle') inphandle;
    handleInput: string;

    networkInput: string = "twitter";

    processing: boolean;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private tipbotApi: TipbotApiService
    ) {}

    async claim() {
        if(this.handleInput && this.networkInput) {
            this.processing = true;
            //check if user already got
            console.log("calling api with: " + this.handleInput.trim() + " and " + this.networkInput.trim());
            try {
                let tipResponse = await this.tipbotApi.tipUser(this.handleInput.trim(), this.networkInput.trim());
                console.log("tipResponse:" + JSON.stringify(tipResponse));
            } catch(err) {
                console.log("err:" + JSON.stringify(err))
            }

            this.snackBar.open(await this.translate.get("routes.xrptip.error_no_balance").toPromise(), null, {duration: 3000});
            this.snackBar.open(await this.translate.get("routes.xrptip.error_already_tipped").toPromise(), null, {duration: 3000});
            this.processing = false;
        }
    }
}
