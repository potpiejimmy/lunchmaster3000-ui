import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { CoilUtil } from '../util/CoilUtil';

@Component({
    selector: "coil",
    templateUrl: "coil.html"
})

export class CoilComponent {

    streamedValue:number = 0;
    checkValue:boolean = true;
    
    constructor(private router: Router, private util: CoilUtil) {}

    isCoilRunning(): boolean {
        return this.util.isCoilRunning();
    }

    redirect() {
        console.log("navigate")
        this.router.navigate(['/xrptip'], { skipLocationChange: true });
    }
}