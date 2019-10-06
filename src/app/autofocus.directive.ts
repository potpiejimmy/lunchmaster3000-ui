import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

    @Input() public appAutofocus: boolean;

    public constructor(private el: ElementRef) {
    }

    public ngAfterContentInit() {
        setTimeout(() => this.el.nativeElement.focus(), 250);
    }
}
