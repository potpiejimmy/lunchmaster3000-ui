import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { formatCurrency } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: "orderset",
    templateUrl: "orderset.html",
    styles: ["@media(max-width: 599px) {.mat-cell {border: none;padding:0 !important;} .mat-row {border-bottom: solid 1px rgba(0,0,0,.12); padding: .5em 0 2.5em;}}"]
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

    @Output()
    chatMessage = new EventEmitter<any>();

    own: boolean;

    _orderInput: string;
    _priceInput: number;
    _inputDeferrer: any;

    _commentInput: string;
    _payLinkInput: string;
    _deliveryCostInput: number;
    _adminInputDeferrer: any;

    chatInput: string;

    displayedColumns: string[] = ['name', 'order', 'price', 'paylink', 'moneyrec'];

    ngOnInit() {
        this.own = this.name == this.orderSet.name;
        this._orderInput = this.orderSet.orders[this.name] && this.orderSet.orders[this.name].order;
        this._priceInput = this.orderSet.orders[this.name] && this.orderSet.orders[this.name].price;
        this._commentInput = this.orderSet.comment;
        this._payLinkInput = this.orderSet.payLink;
        this._deliveryCostInput = this.orderSet.deliverycost;
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
                name: this.name,
                orderSet: this.orderSet,
                order: {
                    order: this._orderInput,
                    price: this._priceInput
                }
            })
        }, 1000);
    }

    get commentInput() {
        return this._commentInput;
    }

    set commentInput(s) {
        this._commentInput = s;
        this.submitAdminDeferred();
    }

    get payLinkInput() {
        return this._payLinkInput;
    }

    set payLinkInput(s) {
        this._payLinkInput = s;
        this.submitAdminDeferred();
    }

    get payDeliveryCostInput() {
        return this._deliveryCostInput;
    }

    set payDeliveryCostInput(n) {
        this._deliveryCostInput = n;
        this.submitAdminDeferred();
    }

    submitAdminDeferred() {
        clearTimeout(this._adminInputDeferrer);
        this.isTyping.emit(true);
        this._adminInputDeferrer = setTimeout(() => {
            this.isTyping.emit(false);
            this.commentChanged.emit({
                orderSet: this.orderSet,
                update: {
                    comment: this._commentInput,
                    payLink: this._payLinkInput
                }
            })
        }, 1000);
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
            sum += o.price ? o.price : 0;
        }
        return this.formatPrice(sum);
    }

    formatPayLink(o) {
        return this.orderSet.payLink && o.price ? this.orderSet.payLink + '/' + o.price : "";
    }

    moneyReceivedClicked(name: string, e: any) {
        this.orderChanged.emit({
            name: name,
            orderSet: this.orderSet,
            order: this.orderSet.orders[name]
        })
    }

    sendChatMsg() {
        this.chatMessage.emit({
            orderSet: this.orderSet,
            msg: this.chatInput
        });
        this.chatInput = '';
    }

    formatMoment(d): string {
        return moment(d).fromNow();
    }
}
