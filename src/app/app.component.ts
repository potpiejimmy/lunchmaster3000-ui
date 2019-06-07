import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private translate: TranslateService, private router: Router) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        
        if (environment.supportedLanguages.includes(translate.getBrowserCultureLang())){
            this.translate.use(translate.getBrowserCultureLang());
        } else if (environment.supportedLanguages.includes(translate.getBrowserLang())){
            this.translate.use(translate.getBrowserLang());
        }
    }

    ngOnInit() {
        // always scroll to the top of the page on route change:
        this.router.events.subscribe(e => e instanceof NavigationEnd ? window.scrollTo(0,0) : null);
    }
}
