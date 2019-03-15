import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "orderset",
    templateUrl: "orderset.html"
})
export class OrderSetComponent {

    @Input()
    orderSet: any;

    @Input()
    own: boolean;

    @Output()
    orderChanged = new EventEmitter<any>();

    @Output()
    cancelled = new EventEmitter<any>();

    @Output()
    isTyping = new EventEmitter<boolean>();

    _orderInput: string;
    _orderInputDeferrer: any;
    _order: string;

    displayedColumns: string[] = ['name', 'order'];

    get orderInput() {
        return this._orderInput;
    }

    set orderInput(s) {
        this._orderInput = s;
        clearTimeout(this._orderInputDeferrer);
        this.isTyping.emit(true);
        this._orderInputDeferrer = setTimeout(() => {
            this.order = this._orderInput;
            this.isTyping.emit(false);
        }, 1000);
    }

    get order() {
        return this._order;
    }

    set order(o) {
        this._order = o;
        this.orderChanged.emit({
            orderSet: this.orderSet,
            order: this._order
        })
    }

    get orderKeys() {
        return Object.keys(this.orderSet.orders);
    }

    cancel() {
        this.cancelled.emit(this.orderSet);
    }

    finish() {
        this.orderSet.finished = true;
    }
}
