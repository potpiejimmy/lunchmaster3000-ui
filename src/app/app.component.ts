import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LmApiService } from './services/lmapi';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('inpname') inpname;

  socket: SocketIOClient.Socket;

  _nameInput: string;
  nameInputDeferrer: any;
  name: string;
  isTyping: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private api: LmApiService
  ) {

    // register socket for receiving data:
    this.socket = io.connect(environment.apiUrl);
    this.socket.on('data', data => {
      if (!this.isTyping) this.data = data;
    })

    // initialize name from local storage
    this.name = this.localStorageService.get('name');
    this._nameInput = this.name;
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
    }, 500);
  }

  get nameInUse(): boolean {
    for (let l of this.data.locations) if (l.votes.includes(this.name)) return true;
    for (let o of this.data.ordersets) if (o.name == this.name || o.orders[this.name]) return true;
    return false;
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.inpname.nativeElement.focus(),100);
    this.refresh();
  }

  refresh() {
    this.api.getData().then(data => {
      console.log("Loaded data: " + data.locations.length + " locations");
      this.data = data;
    });
  }

  checkboxChanged(event) {
    this.api.setFavorite(event.location.name, this.name, event.checked);
  }

  takeOrders(location) {
    this.api.setOrderSet(location, this.name);
  }

  order(e) {
    this.api.setOrder(e.orderSet, this.name, e.order);
  }

  cancel(e) {
    this.api.setOrderSet(e.location, this.name, true);
  }

  finish(e) {
    this.api.setOrderSet(e.location, this.name, false, true);
  }
}