import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AppService } from '../services/app';

@Component({
    selector: "location",
    templateUrl: "location.html"
})
export class LocationComponent implements OnInit {
    @Input()
    location: any;

    @Input()
    name: any;

    @Output()
    change = new EventEmitter<any>();

    @Output()
    takeOrders = new EventEmitter<any>();

    _checked: boolean;

    showEditControls: boolean = false;

    constructor(
        public app: AppService
    ) {}

    ngOnInit(): void {
        this._checked = this.location.votes.includes(this.name);
    }

    get checked() {
        return this._checked;
    }

    set checked(b) {
        this._checked = b;
        this.change.emit({checked: b, location: this.location});
    }

    takeOrdersClicked() {
        this.takeOrders.emit(this.location);
    }

    edit() {
        this.app.locationEditor.editLocation(this.location);
    }
}
