import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LmApiService } from './services/lmapi';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('inpname') inpname;

  socket: SocketIOClient.Socket;

  constructor(
    private api: LmApiService
  ) {
    this.socket = io.connect(environment.apiUrl);
    this.socket.on('data', data => {
      this.data = data;
    })
  }

  _nameInput: string;
  nameInputDeferrer: any;
  name: string;
  _isTyping: boolean = false;
  get isTyping() { return this._isTyping; }
  set isTyping(s) {
    this._isTyping = s;
    console.log(s);
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
    this.nameInputDeferrer = setTimeout(() => this.name = this._nameInput, 500);
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
    this.data.ordersets.push({
      name: this.name,
      location: location,
      orders: {}
    });
  }

  order(e) {
    e.orderSet.orders[this.name] = e.order;
  }

  cancel(e) {
    this.data.ordersets.splice(this.data.ordersets.indexOf(e), 1);
    this.data = JSON.parse(JSON.stringify(this.data));
  }
}
