import { Component } from "@angular/core";
import { Router } from '@angular/router';
import * as util from '../util/CoilUtil';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: "coil",
    templateUrl: "coil.html"
})

export class CoilComponent {

    streamedValue:number = 0;
    checkValue:boolean = true;
    
    constructor(private router: Router, private localStorageService: LocalStorageService) {}

    isCoilRunning(): boolean {
        return util.isCoilRunning();
    }

    redirect() {
        console.log("navigate")
        this.router.navigate(['/xrptip'], { skipLocationChange: true });
    }

    xrpAlreadySent() {
        return this.localStorageService.get("xrpSent");
    }
}