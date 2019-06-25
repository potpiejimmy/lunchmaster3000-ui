import { Component } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "terms",
    templateUrl: "terms.html"
})
export class TermsAndConditionsComponent {

    constructor(private translate: TranslateService) {}

    get currentLang() { return this.translate.currentLang; }
}
