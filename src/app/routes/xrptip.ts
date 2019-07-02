import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TipbotApiService } from '../services/tipbotapi';
import { CoilUtil } from '../util/CoilUtil';

@Component({
    selector: "xrptip",
    templateUrl: "xrptip.html"
})

export class XrpTipComponent {
    @ViewChild('inphandle') inphandle;
    handleInput: string;

    networkInput: string;

    processing: boolean;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private tipbotApi: TipbotApiService,
        private util: CoilUtil
    ) {}

    async claim() {
        //check for coil availability
        if(!this.util.isCoilRunning()) {
            this.snackBar.open(await this.translate.get("routes.xrptip.error_no_coil").toPromise(), null, {duration: 5000});
            this.router.navigate(['/']);
            return;
        }

        //handle tip
        if(this.handleInput && this.networkInput) {
            this.processing = true;
            //check if user already got
            console.log("calling api with: " + this.handleInput.trim() + " and " + this.networkInput.trim());
            try {
                let tipResponse = await this.tipbotApi.tipUser(this.handleInput.trim(), this.networkInput.trim());
                console.log("tipResponse:" + JSON.stringify(tipResponse));
                this.handleResponse(tipResponse);
            } catch(err) {
                console.log("err:" + JSON.stringify(err))
            }

            this.processing = false;
        }
    }

    async handleResponse(response) {
        if(!response || response.error || !response.data || !response.data.status) {
            this.snackBar.open(await this.translate.get("routes.xrptip.error_generic_response").toPromise(), null, {duration: 5000});
        } else {
            switch(response.data.status) {
                case 200: { 
                    this.snackBar.open(await this.translate.get("routes.xrptip.tip_sent").toPromise(), null, {duration: 5000});
                    //redirect to main page
                    this.router.navigate(['/']);
                    break;
                }
                case 300: this.snackBar.open(await this.translate.get("routes.xrptip.error_tip_yourself").toPromise(), null, {duration: 5000}); break;
                case 400: this.snackBar.open(await this.translate.get("routes.xrptip.error_tipbot_disabled").toPromise(), null, {duration: 5000}); break;
                case 401: this.snackBar.open(await this.translate.get("routes.xrptip.error_no_balance").toPromise(), null, {duration: 5000}); break;
                case 404:
                case 500: this.snackBar.open(await this.translate.get("routes.xrptip.error_unknown_user").toPromise(), null, {duration: 5000}); break;
                case 405: this.snackBar.open(await this.translate.get("routes.xrptip.error_already_tipped").toPromise(), null, {duration: 5000}); break;
                default: this.snackBar.open(await this.translate.get("routes.xrptip.error_generic_response").toPromise(), null, {duration: 5000}); break;
            }
        }
    }
}
