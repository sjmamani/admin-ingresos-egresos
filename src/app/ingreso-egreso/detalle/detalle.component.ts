import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscripcion: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.subscripcion = this.store
      .select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  eliminarItem(uid: string) {
    swal
      .fire({
        title: '¿Desea eliminar este item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      })
      .then(result => {
        if (result.value) {
          this.ingresoEgresoService.eliminarIngresoEgreso(uid);
          swal.fire('Eliminado', 'Item eliminado', 'success');
        }
      });
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
