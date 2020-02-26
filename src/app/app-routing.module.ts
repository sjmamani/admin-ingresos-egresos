import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: '',
    // Le decimos a Angular que cuando llegue a esta ruta, cargue tal módulo
    loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
    canLoad: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
