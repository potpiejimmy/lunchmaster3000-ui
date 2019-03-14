import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('inpname') inpname;

  _nameInput: string;
  nameInputDeferrer: any;
  name: string;

  data = {
   locations: [{
      name: "Green Thai",
      link: "https://ni.greenthai.de",
      votes: []
    },
    {
      name: "City Döner",
      link: "n/a",
      votes: []
    },
    {
      name: "Subway",
      link: "https://www.subway.com/de-DE",
      votes: []
    },
    {
      name: "LSG Kantine",
      link: "http://lz-catering.signage-server.de/frankfurt-neu-isenburg/web-app",
      votes: []
    }
   ],
   ordersets: []
  }

  get nameInput() {
    return this._nameInput;
  }

  set nameInput(n) {
    this._nameInput = n;
    if (this.nameInputDeferrer) clearTimeout(this.nameInputDeferrer);
    this.nameInputDeferrer = setTimeout(() => this.name = this._nameInput, 500);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.inpname.nativeElement.focus(),100);
  }

  checkboxChanged(event) {
    if (event.checked) event.location.votes.push(this.name);
    else event.location.votes.splice(event.location.votes.indexOf(this.name), 1);
  }

  takeOrders(location) {
    this.data.ordersets.push({
      name: this.name,
      location: location
    });
  }
}
