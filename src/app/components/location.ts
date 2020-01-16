import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AppService } from '../services/app';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: "location",
    templateUrl: "location.html"
})
export class LocationComponent implements OnInit {
    @Input()
    location: any;

    @Input()
    name: any;

    @Output()
    change = new EventEmitter<any>();

    @Output()
    takeOrders = new EventEmitter<any>();

    @Output()
    favoriteChanged = new EventEmitter<any>();

    _checked: boolean;
    _isFavorite: boolean;

    showEditControls: boolean = false;

    constructor(
        public app: AppService,
        private storage: LocalStorageService
    ) {}

    ngOnInit(): void {
        this._checked = this.location.votes.includes(this.name);
        let favoriteList:string[] = this.storage.get("favorites");
        this._isFavorite = favoriteList && favoriteList.includes(this.location.id);
    }

    get checked() {
        return this._checked;
    }

    set checked(b) {
        this._checked = b;
        this.change.emit({checked: b, location: this.location});
    }

    takeOrdersClicked() {
        this.takeOrders.emit(this.location);
    }

    edit() {
        this.app.locationEditor.editLocation(this.location);
    }

    get favorite() {
        return this._isFavorite;
    }

    set favorite(f) {
        this._isFavorite = f;
        this.favoriteChanged.emit({favorite: f, location: this.location})
    }
}
