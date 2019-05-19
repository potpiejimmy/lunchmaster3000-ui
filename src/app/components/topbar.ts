import { Component, OnInit } from '@angular/core';
import { TypeWriter } from '../util/TypeWriter';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html'
})
export class AppTopbarComponent implements OnInit {

    title: string;

    ngOnInit() {
        let tw = new TypeWriter(["„Was essen wir heute Mittag?“","lunch.community"], t => {
            this.title = t;
        })
        tw.start();
    }
}
