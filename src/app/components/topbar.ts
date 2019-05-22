import { Component, OnInit } from '@angular/core';
import { TypeWriter } from '../util/TypeWriter';
import { AppService } from '../services/app';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html'
})
export class AppTopbarComponent implements OnInit {

    title: string;

    constructor(
        public app: AppService
    ) {}

    ngOnInit() {
        let tw = new TypeWriter(["„Was essen wir heute Mittag?“","lunch.community"], t => {
            this.title = t;
        })
        tw.start();
    }
}
