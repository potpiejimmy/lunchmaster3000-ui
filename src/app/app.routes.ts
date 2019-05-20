import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { MainComponent } from './routes/main';
import { CreateComponent } from './routes/create';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'create', component: CreateComponent},
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
