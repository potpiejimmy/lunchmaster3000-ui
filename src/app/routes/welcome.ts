import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { LmApiService } from '../services/lmapi';
import { Router } from '@angular/router';
import { AppService } from '../services/app';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: "welcome",
    templateUrl: "welcome.html"
})
export class WelcomeComponent implements OnInit, AfterViewInit {

    @ViewChild('inpname') inpname;
    nameInput: string;

    agreeTerms: boolean;
    processing: boolean;

    constructor(
        public app: AppService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {}

    ngOnInit() {
        if (!this.app.community) this.router.navigate(['/'], { replaceUrl: true });
        this.nameInput = this.localStorage.get("name");
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 100);
    }

    async submit() {
        this.processing = true;
        this.localStorage.set("name", this.nameInput.trim());
        this.router.navigate(['/']);
    }

}
