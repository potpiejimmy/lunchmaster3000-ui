import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { MainComponent } from './routes/main';
import { CreateComponent } from './routes/create';
import { WelcomeComponent } from './routes/welcome';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'create', component: CreateComponent},
    {path: 'welcome', component: WelcomeComponent},
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
