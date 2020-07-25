import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth-guard.service';

const emptyPath = ''
const loginPath = 'login'
const dashboardPath = 'dashboard'
const invalidPath = '**'

const routes: Routes = [
  { path: emptyPath, redirectTo:'/'+ loginPath, pathMatch: 'full' },
  { path: loginPath, component: LoginComponent },
  { path: dashboardPath,
    canActivate:[AuthGuard] ,
    component: DashboardComponent ,
  },
  { path: invalidPath, redirectTo: '/'+loginPath }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent]
