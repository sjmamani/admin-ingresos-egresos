import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscripcion: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.subscripcion = this.store
      .select('ui')
      .subscribe(ui => (this.cargando = ui.isLoading));
  }

  ngOnInit() {}

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
