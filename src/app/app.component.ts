import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { LmApiService } from './services/lmapi';
import { AppService } from './services/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private localStorage: LocalStorageService,
        private api: LmApiService,
        private app: AppService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let id = params.id;
            if (id) {
                this.localStorage.set("id", id);
            } else {
                id = this.localStorage.get("id");
            }
            if (!id) {
                // no community selected
                this.router.navigate(['/create'], { replaceUrl: true });
            } else {
                this.api.getCommunity(id).then(c => this.app.community = c);
            }
        });
    }
}
