import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutes } from './app.routes';
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
import { AppTopbarComponent } from './components/topbar';
import { AppFooterComponent } from './components/footer';
import { LocationComponent } from './components/location';
import { OrderSetComponent } from './components/orderset';
import { LmApiService } from './services/lmapi';
import { registerLocaleData } from '@angular/common';
import { MainComponent } from './routes/main';
import { CreateComponent } from './routes/create';
import { AppService } from './services/app';
import { WelcomeComponent } from './routes/welcome';

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppFooterComponent,
    MainComponent,
    LocationComponent,
    OrderSetComponent,
    CreateComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutes,
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
    LocalStorageModule.forRoot({ prefix: 'lunch.community', storageType: 'localStorage' }), // or sessionStorage
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppService,
    LmApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
