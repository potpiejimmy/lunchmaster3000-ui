import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { LmApiService } from '../services/lmapi';
import { Router } from '@angular/router';
import { AppService } from '../services/app';

@Component({
    selector: "create-community",
    templateUrl: "create.html"
})
export class CreateComponent implements AfterViewInit {

    @ViewChild('inpname') inpname;
    nameInput: string;

    processing: boolean;

    constructor(
        public app: AppService,
        private api: LmApiService,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 100);
    }

    async create() {
        this.processing = true;
        let newCommunity:any = {
            name: this.nameInput.trim()
        };

        let c = await this.api.createCommunity(newCommunity);
        this.router.navigate(['/'], { queryParams: { id: c.webid } });
    }
}
