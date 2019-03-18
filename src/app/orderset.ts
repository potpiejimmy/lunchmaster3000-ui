import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from "@angular/core";

@Component({
    selector: "orderset",
    templateUrl: "orderset.html"
})
export class OrderSetComponent implements OnInit, AfterViewInit {

    @ViewChild('inporder')
    inporder;

    @Input()
    orderSet: any;

    @Input()
    name: string;

    @Output()
    orderChanged = new EventEmitter<any>();

    @Output()
    cancelled = new EventEmitter<any>();

    @Output()
    finished = new EventEmitter<any>();

    @Output()
    isTyping = new EventEmitter<boolean>();

    own: boolean;
    _orderInput: string;
    _orderInputDeferrer: any;
    _order: string;

    displayedColumns: string[] = ['name', 'order'];

    ngOnInit() {
        this.own = this.name == this.orderSet.name;
        this._order = this.orderSet.orders[this.name];
        this._orderInput = this._order;
    }

    ngAfterViewInit(): void {
        this.inporder.nativeElement.focus();
    }

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
        }, 2000);
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
        this.finished.emit(this.orderSet);
    }
}
