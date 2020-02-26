import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';

@NgModule({
  declarations: [LoginComponent, RegistrarComponent],
  imports: [
      CommonModule,
      FormsModule,
      AngularFireAuthModule,
      RouterModule
  ]
})
export class AuthModule {}
