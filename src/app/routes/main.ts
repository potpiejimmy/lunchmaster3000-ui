import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { LmApiService } from '../services/lmapi';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppService } from '../services/app';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'main',
    templateUrl: 'main.html'
})
export class MainComponent implements AfterViewInit, OnDestroy {

    @ViewChild('locationEditor') locationEditor;

    socket: SocketIOClient.Socket;

    name: string;

    isTyping: boolean = false;

    constructor(
        private localStorageService: LocalStorageService,
        private api: LmApiService,
        public app: AppService,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private snackBar: MatSnackBar) {

        // initialize name from local storage
        this.name = this.localStorageService.get('name');

        this.route.queryParams.subscribe(params => {
            let id = params.id;
            if (id) {
                this.localStorageService.set("id", id);
            } else {
                id = this.localStorageService.get("id");
            }
            if (!id) {
                // no community selected
                this.router.navigate(['/create'], { replaceUrl: true });
            } else {
                // load community
                this.app.loading = true;
                this.api.getCommunity(id).then(async c => {
                    if (!c) {
                        this.snackBar.open(await this.translate.get("routes.main.community_id_does_not_exist").toPromise(), null, {duration: 5000});
                        this.router.navigate(['/create'], { replaceUrl: true });
                    } else {
                        this.app.community = c;
                        if (!this.name) {
                            // name not set?
                            this.router.navigate(['/welcome'], { replaceUrl: true });
                        } else {
                            this.app.name = this.name;
                            await this.startup();
                        }
                    }
                }).finally(() => {
                    this.app.loading = false;
                });
            }
        });
    }

    async startup(): Promise<void> {
        this.initSocket();
        await this.load();
        try {
            Notification.requestPermission(); // request notification permission
        } catch (err) {}
    }

    initSocket() {
        // register socket for receiving data:
        this.socket = io.connect(environment.apiUrl+this.app.community.webid);
        this.socket.on('reconnect', async () => {
            //reload data from server on connect to fix iOS problem with PWA
            this.adaptDataFromServer(await this.api.getData());
        });
        this.socket.on('data', data => {
            if (!this.isTyping) this.adaptDataFromServer(data);
        });
        this.socket.on('push', async msg => {
            if (msg.name != this.name) {
                new Notification(msg.title, {
                    body: msg.type != 'chat' ? await this.translate.get("push."+msg.body, msg.params).toPromise() : msg.body,
                    requireInteraction: msg.type != 'chat'
                });
            }
        });
    }

    ngAfterViewInit(): void {
        this.app.locationEditor = this.locationEditor;
    }

    ngOnDestroy(): void {
        if (this.socket) this.socket.close();
    }

    data = {
        locations: [],
        ordersets: [],
        chat: []
    };

    get nameInUse(): boolean {
        for (let l of this.data.locations) if (l.votes.includes(this.name)) return true;
        for (let o of this.orderSets) if (o.name == this.name || o.orders[this.name]) return true;
        return false;
    }

    get orderSets(): Array<any> {
        return Object.values(this.data.ordersets);
    }

    async load(): Promise<void> {
        this.data = await this.api.getData();
    }

    adaptDataFromServer(data) {
        this.data.locations = data.locations;
        this.data.chat = data.chat;
        for (let o of Object.values<any>(data.ordersets)) {
            // adapt new ones
            if (!this.data.ordersets[o.id]) this.data.ordersets[o.id] = o;
            else {
                let orderset = this.data.ordersets[o.id];
                orderset.orders = o.orders;
                orderset.finished = o.finished;
                orderset.arrived = o.arrived;
                orderset.chat = o.chat;
                orderset.comment = o.comment;
                orderset.payLink = o.payLink;
                orderset.fee = o.fee;
            }
        }
        for (let o of Object.values<any>(this.data.ordersets)) {
            // remove deleted ones
            if (!data.ordersets[o.id]) delete this.data.ordersets[o.id];
        }
    }

    checkboxChanged(event) {
        this.api.setFavorite(event.location.id, this.name, event.checked);
    }

    takeOrders(location: any) {
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

    reopen(e) {
        this.api.updateOrderSet(e.id, false, false);
    }

    arrive(e) {
        this.api.updateOrderSet(e.id, true, true);
    }

    sendChatMsg(e: any) {
        this.api.sendChatMsg(e.orderSet ? e.orderSet.id : null, this.name, e.msg);
    }
}
