import * as fromEgresoIngreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

const initState: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(
  state = initState,
  action: fromEgresoIngreso.acciones
) {
  switch (action.type) {
    case fromEgresoIngreso.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return { ...item };
          })
        ]
      };

    case fromEgresoIngreso.UNSET_ITEMS:
      return { items: [] };

    default:
      return state;
  }
}
