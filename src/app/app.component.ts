import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        // always scroll to the top of the page on route change:
        this.router.events.subscribe(e => e instanceof NavigationEnd ? window.scrollTo(0,0) : null);
    }
}
