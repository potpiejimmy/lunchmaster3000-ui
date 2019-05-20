import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { LmApiService } from '../services/lmapi';
import { Router } from '@angular/router';

@Component({
    selector: "create-community",
    templateUrl: "create.html"
})
export class CreateComponent implements AfterViewInit {

    @ViewChild('inpname') inpname;
    nameInput: string;

    agreeTerms: boolean;
    processing: boolean;

    constructor(
        private api: LmApiService,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 100);
    }

    async create() {
        this.processing = true;
        let c = await this.api.createCommunity(this.nameInput);
        this.router.navigate(['/'], { queryParams: { id: c.webid } });
    }
}
