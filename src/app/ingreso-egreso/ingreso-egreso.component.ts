import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSubs: Subscription = new Subscription();

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.IEState>
  ) {}

  ngOnInit() {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe(ui => (this.cargando = ui.isLoading));

    this.formulario = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(1))
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({
      ...this.formulario.value,
      tipo: this.tipo
    });
    console.log(ingresoEgreso);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Guardado', ingresoEgreso.descripcion, 'success');
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.log(err);
      });
    this.formulario.reset({ monto: 0 });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
}
