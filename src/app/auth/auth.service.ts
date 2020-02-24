import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) {}

  authInit() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      console.log(user);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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
          .then(() => this.router.navigate(['/']));
      })
      .catch(err => swal.fire('Error', err.message, 'error'));
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(err => swal.fire('Error', err.message, 'error'));
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
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
}
