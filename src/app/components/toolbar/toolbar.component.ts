import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  userType: string = '';

  constructor(private router: Router, private auth: Auth, private firestore: Firestore) {
    this.getUserType();
  }

  async getUserType() {
    const user = await this.auth.currentUser; 

    if (user) {
      const alumnoRef = doc(this.firestore, `alumnos/${user.uid}`);
      const alumnoDoc = await getDoc(alumnoRef);
  
      if (alumnoDoc.exists()) {
        this.userType = 'alumno';
      } else {
        const profesorRef = doc(this.firestore, `profesores/${user.uid}`);
        const profesorDoc = await getDoc(profesorRef);
  
        if (profesorDoc.exists()) {
          this.userType = 'profesor';
        } else {
          console.error('El usuario no existe en ninguna de las colecciones.');
        }
      }
    } else {
      console.error('No hay usuario autenticado.');
    }
  }

  navigateToProfile() {
    if (this.userType === 'profesor') {
      this.router.navigate(['/perfil-prof']);
    } else if (this.userType === 'alumno') {
      this.router.navigate(['/perfil-alumno']);
    } else {
      console.error('Tipo de usuario desconocido');
    }
  }

  navigateToHome() {
    this.router.navigate(['/menu-profesor']);
  }

  async logout() {
    try {
      await signOut(this.auth); 
      this.router.navigate(['/inicio-sesion']); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}

