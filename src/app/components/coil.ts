import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "coil",
    templateUrl: "coil.html"
})

export class CoilComponent {

    streamedValue:number = 0;
    checkValue:boolean = true;
    
    constructor(private router: Router) {}

    isCoilRunning(): boolean {
        //console.log(JSON.stringify(document['monetization']));
        //return document['monetization'] && document['monetization'].state === 'started';
        return true;
    }

    redirect() {
        console.log("navigate")
        this.router.navigate(['/xrptip']);
    }
}