import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }
}
