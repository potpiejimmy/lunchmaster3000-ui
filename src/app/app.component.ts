import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('inpname') inpname;

  name: string = "Test";

  locations = [{
      name: "Green Thai",
      link: "https://ni.greenthai.de",
      votes: ["Thorsten", "Johnny"]
    },
    {
      name: "City Döner",
      link: "n/a",
      votes: ["Klaus"]
    },
    {
      name: "Subway",
      link: "https://www.subway.com/de-DE"
    },
    {
      name: "LSG Kantine",
      link: "http://lz-catering.signage-server.de/frankfurt-neu-isenburg/web-app"
    }
  ]

  ngAfterViewInit(): void {
    setTimeout(()=>this.inpname.nativeElement.focus(),100);
  }
}
