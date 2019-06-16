import { Component } from "@angular/core";
import { environment } from '../../environments/environment';

@Component({
    selector: "donate",
    templateUrl: "donate.html"
})
export class DonateComponent {

    get returnUrl(): string {
        return environment.shareUrl;
    }
}
