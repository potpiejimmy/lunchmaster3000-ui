import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { AppService } from '../services/app';
import { LocalStorageService } from 'angular-2-local-storage';
import { DeferredValue } from '../util/DeferredValue';
import { Router } from '@angular/router';

@Component({
    selector: "settings",
    templateUrl: "settings.html"
})
export class SettingsComponent implements OnInit, AfterViewInit {
    
    nameInput: DeferredValue;

    constructor(
        public app: AppService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.nameInput = new DeferredValue(1000, n => this.setName(n));
    }

    ngOnInit() {
        if (!this.app.community) this.router.navigate(['/'], { replaceUrl: true });
        this.nameInput._value = this.localStorage.get("name");
    }

    ngAfterViewInit() {
    }

    setName(v: string) {
        console.log("Storing name: " + v);
        this.localStorage.set("name", v);
    }

    leaveCommunity() {
        this.localStorage.remove("id");
        this.router.navigate(['/']);
    }
}
