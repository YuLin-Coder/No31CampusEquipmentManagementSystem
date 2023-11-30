import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cems_login',
    pathMatch: 'full'
  },
  {
    path:"cems_login",
    component:LoginComponent
  },
  {
    path:"main_page",
    component:MainPageComponent
  },
  { path: 'error', component: PageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/cems_login'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
