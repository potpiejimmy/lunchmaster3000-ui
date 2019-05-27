import { Component, OnInit } from '@angular/core';
import { TypeWriter } from '../util/TypeWriter';
import { AppService } from '../services/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html'
})
export class AppTopbarComponent implements OnInit {

    title: string;

    constructor(
        public app: AppService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        let tw = new TypeWriter(["„Was essen wir heute Mittag?“","lunch.community"], t => {
            this.title = t;
        })
        tw.start();
    }

    linkCopied() {
        this.snackBar.open("⎘ Community link copied to clipboard", null, {duration: 3000});
    }

    get communityLink(): string {
        return 'https://lunch.community?id='+this.app.community.webid;
    }
}
