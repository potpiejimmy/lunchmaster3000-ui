import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LmApiService } from '../services/lmapi';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'main',
    templateUrl: 'main.html'
})
export class MainComponent implements AfterViewInit {

    @ViewChild('inpname') inpname;

    socket: SocketIOClient.Socket;

    _nameInput: string;
    nameInputDeferrer: any;
    name: string;

    nameWasSet: boolean = false;
    isTyping: boolean = false;

    constructor(
        private localStorageService: LocalStorageService,
        private api: LmApiService
    ) {

        // register socket for receiving data:
        this.socket = io.connect(environment.apiUrl);
        this.socket.on('data', data => {
            if (!this.isTyping) this.adaptDataFromServer(data);
        })
        this.socket.on('push', msg => {
            if (msg.name != this.name) {
                new Notification(msg.title, {
                    body: msg.body,
                    requireInteraction: msg.type != 'chat'
                });
            }
        })

        // initialize name from local storage
        this.name = this.localStorageService.get('name');
        this._nameInput = this.name;
        this.nameWasSet = this.name && this.name.length > 2;
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.inpname && this.inpname.nativeElement.focus(), 100);
        this.load();
        Notification.requestPermission();
    }

    data = {
        locations: [],
        ordersets: []
    };

    get nameInput() {
        return this._nameInput;
    }

    set nameInput(n) {
        this._nameInput = n;
        clearTimeout(this.nameInputDeferrer);
        this.nameInputDeferrer = setTimeout(() => {
            this.name = this._nameInput;
            this.localStorageService.set('name', this.name);
        }, 1000);
    }

    get nameInUse(): boolean {
        for (let l of this.data.locations) if (l.votes.includes(this.name)) return true;
        for (let o of this.orderSets) if (o.name == this.name || o.orders[this.name]) return true;
        return false;
    }

    get orderSets(): Array<any> {
        return Object.values(this.data.ordersets);
    }

    load() {
        this.api.getData().then(data => {
            console.log("Loaded data: " + data.locations.length + " locations");
            this.data = data;
        });
    }

    adaptDataFromServer(data) {
        this.data.locations = data.locations;
        for (let o of Object.values<any>(data.ordersets)) {
            // adapt new ones
            if (!this.data.ordersets[o.id]) this.data.ordersets[o.id] = o;
            else {
                let orderset = this.data.ordersets[o.id];
                orderset.orders = o.orders;
                orderset.finished = o.finished;
                orderset.arrived = o.arrived;
                orderset.chat = o.chat;
                if (o.name != this.name) {
                    orderset.comment = o.comment;
                    orderset.payLink = o.payLink;
                }
            }
        }
        for (let o of Object.values<any>(this.data.ordersets)) {
            // remove deleted ones
            if (!data.ordersets[o.id]) delete this.data.ordersets[o.id];
        }
    }

    checkboxChanged(event) {
        this.api.setFavorite(event.location.name, this.name, event.checked);
    }

    takeOrders(location) {
        this.api.createOrderSet(location, this.name, this.localStorageService.get('paylink'));
    }

    update(e) {
        this.localStorageService.set('paylink', e.update.payLink);
        this.api.updateOrderSetComment(e.orderSet.id, e.update);
    }

    order(e) {
        this.api.setOrder(e.orderSet.id, e.name, e.order);
    }

    cancel(e) {
        this.api.deleteOrderSet(e.id);
    }

    finish(e) {
        this.api.updateOrderSet(e.id, true);
    }

    arrive(e) {
        this.api.updateOrderSet(e.id, false, true);
    }

    sendChatMsg(e: any) {
        this.api.sendChatMsg(e.orderSet.id, this.name, e.msg);
    }
}
