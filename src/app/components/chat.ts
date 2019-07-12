import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: "chat",
    templateUrl: "chat.html"
})
export class ChatComponent {

    @Input()
    orderSet: any;

    @Input()
    data: any;

    @Output()
    chatMessage = new EventEmitter<any>();

    chatInput: string;

    sendChatMsg() {
        this.chatMessage.emit({
            orderSet: this.orderSet, // Note: is null for general chat
            msg: this.chatInput
        });
        this.chatInput = '';
    }

    formatMoment(d): string {
        return moment(d).fromNow();
    }
}
