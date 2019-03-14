import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "location",
    templateUrl: "location.html"
})
export class LocationComponent {
    @Input()
    location: any;

    @Output()
    change = new EventEmitter<any>();

    @Output()
    takeOrders = new EventEmitter<any>();

    _checked: boolean;

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
}
