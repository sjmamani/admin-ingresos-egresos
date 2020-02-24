import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
