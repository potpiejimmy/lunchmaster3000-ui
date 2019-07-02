import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "join",
    templateUrl: "join.html"
})

export class JoinComponent {
    @ViewChild('inplink') inplink;
    linkInput: string;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {}

    async join() {
        let urlParams = new URLSearchParams(this.linkInput.substring(this.linkInput.indexOf("?")));
        let communityId = urlParams && urlParams.get('id');
        if(communityId)
            this.router.navigate(['/'], { queryParams: { id: communityId } });
        else
            this.snackBar.open(await this.translate.get("routes.join.error").toPromise(), null, {duration: 3000});
    }
}
