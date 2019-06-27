import { Component, OnInit } from '@angular/core';
import { TypeWriter } from '../util/TypeWriter';
import { AppService } from '../services/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html'
})
export class AppTopbarComponent implements OnInit {

    title: string;

    constructor(
        public app: AppService,
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {}

    async ngOnInit() {
        let slogan = await this.translate.get("components.topbar.slogan").toPromise();
        let tw = new TypeWriter([slogan,"lunch.community"], t => {
            this.title = t;
        })
        tw.start();
    }

    async linkCopied() {
        this.snackBar.open(await this.translate.get("components.topbar.link_copied").toPromise(), null, {duration: 3000});
    }

    get communityLink(): string {
        return environment.shareUrl+'?id='+this.app.community.webid;
    }
}
