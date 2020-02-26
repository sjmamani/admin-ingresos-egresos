import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
};

export function authReducer(state = initState, action: fromAuth.acciones) {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: { ...action.user }
      };

    default:
      return state;
  }
}
