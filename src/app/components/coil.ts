import { Component } from "@angular/core";


@Component({
    selector: "coil",
    templateUrl: "coil.html"
})

export class CoilComponent {

    streamedValue:number = 0;
    checkValue:boolean = true;
    
    constructor() {}

    isCoilRunning(): boolean {
        //console.log(JSON.stringify(document['monetization']));
        return document['monetization'] && document['monetization'].state === 'started';
    }

    getStreamedValue(): number {
        if(this.checkValue) {
            if(document['monetization'] && document['monetization'].overallStreamed)
                this.streamedValue = document['monetization'].overallStreamed.amount;
            else
                this.streamedValue = 0;

            this.checkValue = false;
        }

        return this.streamedValue;
    }

    convertToXrp(): number {
        return this.streamedValue;
    }
}