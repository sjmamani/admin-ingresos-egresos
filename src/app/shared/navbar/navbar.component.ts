import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.nombre = auth.user.nombre;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
