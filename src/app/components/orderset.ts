import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

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
    reopened = new EventEmitter<any>();

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
    _feeInput: number;
    _adminInputDeferrer: any;

    displayedColumns: string[] = ['name', 'order', 'price', 'fee', 'total', 'paylink', 'moneyrec'];

    constructor(private translate: TranslateService) {
        
    }

    ngOnInit() {
        this.own = this.name == this.orderSet.name;
        this._orderInput = this.orderSet.orders[this.name] && this.orderSet.orders[this.name].order;
        this._priceInput = this.orderSet.orders[this.name] && this.orderSet.orders[this.name].price;
        this._commentInput = this.orderSet.comment;
        this._payLinkInput = this.orderSet.payLink;
        this._feeInput = this.orderSet.fee;
    }

    ngAfterViewInit(): void {
        setTimeout(()=> this.inporder && this.inporder.nativeElement.focus(), 10);
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

    get feeInput() {
        return this._feeInput;
    }

    set feeInput(d) {
        this._feeInput = d ? d : 0;
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
                    payLink: this._payLinkInput,
                    fee: this._feeInput
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

    reopen() {
        this.reopened.emit(this.orderSet);
    }

    arrive() {
        this.arrived.emit(this.orderSet);
    }

    formatPrice(p: number): string {
        if (!p) return '';
        return this.formatNumberInLocale(p);
    }

    get sum(): number {
        let sum = 0;
        for (let o of Object.values<any>(this.orderSet.orders)) {
            sum += o.price ? o.price : 0;
        }

        if(this.orderSet.fee)
            sum += this.orderSet.fee;
        
        return sum;
    }

    feePerPerson() : number {
        if(this.orderSet && this.orderSet.orders && this.orderKeys.length && this.orderSet.fee)
            return Math.ceil(this.orderSet.fee / this.orderKeys.length*100)/100;
        else
            return 0;
    }

    totalPerPerson(p): number {
        return p + this.feePerPerson();
    }

    get decimalSeparator(): string {
        return (1.1).toLocaleString().substring(1, 2);
    }

    get thousandsSeparator(): string {
        return (1000).toLocaleString().substring(1, 2);
    } 

    formatNumberInLocale(n: number) {
        if (!n) return '';
        return n.toLocaleString(this.translate.currentLang, {minimumFractionDigits: 2});
    }

    formatPayLink(o) {
        return this.orderSet.payLink && o.price ? this.orderSet.payLink + '/' + Math.round((o.price + this.feePerPerson())*100)/100 : "";
    }

    moneyReceivedClicked(name: string, e: any) {
        this.orderChanged.emit({
            name: name,
            orderSet: this.orderSet,
            order: this.orderSet.orders[name]
        })
    }
}
