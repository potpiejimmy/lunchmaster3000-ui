export class DeferredValue {
    
    _deferrer: any;
    _value: string;

    constructor(
        private delay: number,
        private callback: (v:string) => void
    ) {}

    get value() {
        return this._value;
    }

    set value(v: string) {
        this._value = v;
        clearTimeout(this._deferrer);
        this._deferrer = setTimeout(() => this.callback(v), this.delay);
    }
}
