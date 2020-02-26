import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.nombre = auth.user.nombre;
      });
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscripciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
