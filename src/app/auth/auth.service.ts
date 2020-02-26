import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction
} from '../shared/ui.actions';
import { User } from './user.model';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription = new Subscription();
  usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  authInit() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userSubscription = this.afDB
          .doc(`${user.uid}/usuario`)
          .valueChanges()
          .subscribe((userObj: any) => {
            const newUser = new User(userObj);
            this.store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Crea registro en bd
        const user: User = {
          uid: res.user.uid,
          nombre,
          email: res.user.email
        };
        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.store.dispatch(new DesactivarLoadingAction());
            this.router.navigate(['/']);
          });
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Error', err.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Error', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user == null) {
          this.router.navigate(['/login']);
        }
        return user != null;
      })
    );
  }

  getUsuario() {
    return { ...this.usuario };
  }
}
