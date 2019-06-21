import { Component } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "privacy",
    templateUrl: "privacy.html"
})
export class PrivacyAndCookiesComponent {
    
    constructor(private translate: TranslateService) {}

    get currentLang() { return this.translate.currentLang; }
}
