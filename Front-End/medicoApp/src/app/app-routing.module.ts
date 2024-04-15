import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { ResearchPageComponent } from './research-page/research-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'home' , component : HomeComponent},
  { path : 'landingPage', component : LandingPageComponent},
  { path : 'formPage' , component : FormPageComponent},
  { path : 'researchPage' , component : ResearchPageComponent},
  { path : 'aboutPage' , component : AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
