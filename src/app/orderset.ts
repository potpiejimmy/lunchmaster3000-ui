import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { formatCurrency } from '@angular/common';

@Component({
    selector: "orderset",
    templateUrl: "orderset.html"
})
export class OrderSetComponent implements OnInit, AfterViewInit {

    @ViewChild('inporder')
    inporder;

    @ViewChild('inpcomment')
    inpcomment;

    @Input()
    orderSet: any;

    @Input()
    name: string;

    @Output()
    orderChanged = new EventEmitter<any>();

    @Output()
    commentChanged = new EventEmitter<any>();

    @Output()
    cancelled = new EventEmitter<any>();

    @Output()
    finished = new EventEmitter<any>();

    @Output()
    arrived = new EventEmitter<any>();

    @Output()
    isTyping = new EventEmitter<boolean>();

    own: boolean;

    _orderInput: string;
    _priceInput: number;
    _inputDeferrer: any;

    _commentInput: string;
    _commentInputDeferrer: any;
    _comment: string;

    displayedColumns: string[] = ['name', 'order', 'price'];

    ngOnInit() {
        this.own = this.name == this.orderSet.name;
        this._orderInput = this.orderSet.orders[this.name] && this.orderSet.orders[this.name].order;
        this._comment = this.orderSet.comment;
        this._commentInput = this._comment;
    }

    ngAfterViewInit(): void {
        setTimeout(()=>this.inporder.nativeElement.focus(), 10);
    }

    get orderInput() {
        return this._orderInput;
    }

    set orderInput(s) {
        this._orderInput = s;
        this.submitOrderDeferred();
    }

    get priceInput() {
        return this._priceInput;
    }

    set priceInput(p) {
        this._priceInput = p;
        this.submitOrderDeferred();
    }

    submitOrderDeferred() {
        clearTimeout(this._inputDeferrer);
        this.isTyping.emit(true);
        this._inputDeferrer = setTimeout(() => {
            this.isTyping.emit(false);
            this.orderChanged.emit({
                orderSet: this.orderSet,
                order: {
                    order: this._orderInput,
                    price: this._priceInput
                }
            })
        }, 500);
    }

    get commentInput() {
        return this._commentInput;
    }

    set commentInput(s) {
        this._commentInput = s;
        clearTimeout(this._commentInputDeferrer);
        this.isTyping.emit(true);
        this._commentInputDeferrer = setTimeout(() => {
            this.comment = this._commentInput;
            this.isTyping.emit(false);
        }, 500);
    }

    get comment() {
        return this._comment;
    }

    set comment(c) {
        this._comment = c;
        this.commentChanged.emit({
            orderSet: this.orderSet,
            comment: this._comment
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

    arrive() {
        this.arrived.emit(this.orderSet);
    }

    formatPrice(p: number): string {
        if (!p) return '';
        return formatCurrency(p, "de", "€");
    }

    get sum(): string {
        let sum = 0;
        for (let o of Object.values<any>(this.orderSet.orders)) {
            sum += o.price;
        }
        return this.formatPrice(sum);
    }
}
