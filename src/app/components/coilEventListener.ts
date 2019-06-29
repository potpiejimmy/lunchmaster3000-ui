import { Component, OnInit } from "@angular/core";


@Component({
    selector: "coilEventListener",
    templateUrl: "coilEventListener.html"
})

export class CoilEventListenerComponent implements OnInit {
    
    streamedUSDValue:number = 0;
    
    constructor() {}

    ngOnInit() {
        document['monetization'].addEventListener('monetizationprogress', this.progressEventHandler)
    }

    async progressEventHandler (event) {
        console.log(JSON.stringify(event.detail));
        
        if(!document['monetization'].overallStreamed) {
            document['monetization'].overallStreamed = {
                amount: Number(event.detail.amount),
                assetCode: event.detail.assetCode,
                assedScale: event.detail.assetScale
            }
        } else {
            document['monetization'].overallStreamed.amount += Number(event.detail.amount);
        }

        console.log("overall streamed: " + document['monetization'].overallStreamed.amount)
    }
}