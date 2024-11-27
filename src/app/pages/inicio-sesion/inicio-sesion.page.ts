import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  email: string = '';  // Inicializa la propiedad
  password: string = ''; // Inicializa la propiedad

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async login() {
    if (!this.email || !this.password) {
      alert('Por favor, ingresa un correo y contraseña válidos');
      return;
    }

    try {

      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Inicio de sesión exitoso:', userCredential);

      if (this.email.endsWith('@duocuc.cl')) {
        this.router.navigate(['/menu-principal']);
      } else if (this.email.endsWith('@profesor.duocuc.cl')) {
        this.router.navigate(['/menu-profesor']);
      } else {
        alert('Tipo de correo inválido');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  }
  
  ngOnInit() {
  }
}
