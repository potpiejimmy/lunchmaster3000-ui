import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { AppService } from '../services/app';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: "settings",
    templateUrl: "settings.html"
})
export class SettingsComponent implements OnInit, AfterViewInit {
    
    @ViewChild('inpname') inpname;
    nameInput: string;

    constructor(
        public app: AppService,
        private localStorage: LocalStorageService
    ) {}

    ngOnInit() {
        this.nameInput = this.localStorage.get("name");
    }

    ngAfterViewInit() {
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 100);
    }
}
