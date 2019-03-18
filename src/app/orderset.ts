import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    _orderInputDeferrer: any;
    _order: string;

    _commentInput: string;
    _commentInputDeferrer: any;
    _comment: string;

    displayedColumns: string[] = ['name', 'order'];

    constructor(private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.own = this.name == this.orderSet.name;
        this._order = this.orderSet.orders[this.name];
        this._orderInput = this._order;
        this._comment = this.orderSet.comment;
        this._commentInput = this._comment;
    }

    ngAfterViewInit(): void {
        if (!this.own) setTimeout(()=>this.inporder.nativeElement.focus(), 10);
        if (this.orderSet.arrived) setTimeout(()=>this.snackBar.open("ESSEN IST DAAA!!!!!"), 100);
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
        }, 1000);
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
}
