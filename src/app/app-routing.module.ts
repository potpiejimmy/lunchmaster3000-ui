import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './routes/main';
import { CreateComponent } from './routes/create';
import { WelcomeComponent } from './routes/welcome';
import { SettingsComponent } from './routes/settings';
import { TermsAndConditionsComponent } from './routes/terms';
import { PrivacyAndCookiesComponent } from './routes/privacy';
import { AboutComponent } from './routes/about';
import { JoinComponent } from './routes/join';
import { XrpTipComponent } from './routes/xrptip';

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'create', component: CreateComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'terms', component: TermsAndConditionsComponent},
    {path: 'privacy', component: PrivacyAndCookiesComponent},
    {path: 'join', component: JoinComponent},
    {path: 'xrptip', component: XrpTipComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
