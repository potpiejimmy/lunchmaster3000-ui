import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// Special
import { LocalStorageModule } from 'angular-2-local-storage';
import { CurrencyMaskModule } from "ng2-currency-mask";

// App
import { AppComponent } from './app.component';
import { LocationComponent } from './location';
import { OrderSetComponent } from './orderset';
import { LmApiService } from './services/lmapi';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    OrderSetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // Material
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    // Special
    CurrencyMaskModule,
    LocalStorageModule.forRoot({ prefix: 'lunchmaster3000', storageType: 'localStorage' }), // or sessionStorage
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LmApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
