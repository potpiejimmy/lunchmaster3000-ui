import { Component, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";

@Component({
    selector: "location",
    templateUrl: "location.html"
})
export class LocationComponent implements AfterViewInit {
    @Input()
    location: any;

    @Input()
    name: any;

    @Output()
    change = new EventEmitter<any>();

    @Output()
    takeOrders = new EventEmitter<any>();

    _checked: boolean;

    ngAfterViewInit(): void {
        setTimeout(() => this._checked = this.location.votes.includes(this.name), 0);
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
}
