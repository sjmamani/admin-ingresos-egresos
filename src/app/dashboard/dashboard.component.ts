import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
