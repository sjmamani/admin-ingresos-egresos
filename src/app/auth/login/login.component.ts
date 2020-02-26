import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscripcion: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.subscripcion = this.store.select('ui').subscribe(ui => (this.cargando = ui.isLoading));
  }

  ngOnInit() {}

  login(data: any) {
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
