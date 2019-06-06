import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        
        if (environment.supportedLanguages.includes(translate.getBrowserCultureLang())){
            this.translate.use(translate.getBrowserCultureLang());
        } else if (environment.supportedLanguages.includes(translate.getBrowserLang())){
            this.translate.use(translate.getBrowserLang());
        }
    }
}
