import { Component, OnInit } from '@angular/core';
import { TypeWriter } from '../util/TypeWriter';
import { AppService } from '../services/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html',
    animations: [
        trigger('shiftCarousel', [
            state('idle', style({
                transform: 'translateX(0)'
            })),
            state('shiftedLeft', style({
                transform: 'translateX(-122px)'
            })),
            transition('idle => shiftedLeft', animate('2s ease-in-out')),
            transition('shiftedLeft => idle', animate('0s'))
        ])
    ]
})
export class AppTopbarComponent implements OnInit {

    title: string;
    tw: TypeWriter

    dishes = [1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6];
    animationState = 'idle';

    constructor(
        public app: AppService,
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {}

    async ngOnInit() {
        let slogan = await this.translate.get("components.topbar.slogan").toPromise();
        this.tw = new TypeWriter([slogan,"lunch.community"], t => {
            this.title = t;
        })
        this.tw.start();
        setTimeout(() => { this.shiftCarousel(); setInterval(()=>this.shiftCarousel(), 10000) }, 2000);
    }

    shiftCarousel() {
        this.animationState='shiftedLeft';
    }

    shiftAnimationDone(event) {
        if (event.toState === 'shiftedLeft') {
            this.animationState = 'idle';
            let i = this.dishes.shift();
            this.dishes.push(i);
        }
    }

    async linkCopied() {
        this.snackBar.open(await this.translate.get("components.topbar.link_copied").toPromise(), null, {duration: 3000});
    }

    get communityLink(): string {
        return environment.shareUrl+'?id='+this.app.community.webid;
    }

    dishStyle(i: number): any {
        console.log(i);
        return {'background': "url('/assets/dishes/dish1.jpg') no-repeat center center", 'background-size': 'cover'};
    }
}
