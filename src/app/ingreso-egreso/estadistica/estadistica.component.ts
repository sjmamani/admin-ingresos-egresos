import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  cantIngresos: number;
  cantEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<fromIngresoEgreso.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cantEgresos = 0;
    this.cantIngresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cantIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cantEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }
}
