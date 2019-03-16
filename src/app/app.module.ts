import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

// Special
import { LocalStorageModule } from 'angular-2-local-storage';

// App
import { AppComponent } from './app.component';
import { LocationComponent } from './location';
import { OrderSetComponent } from './orderset';
import { LmApiService } from './services/lmapi';

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
    // Material
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    // Special
    LocalStorageModule.forRoot({ prefix: 'lunchmaster3000', storageType: 'localStorage' }), // or sessionStorage
  ],
  providers: [
    LmApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
