import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Usuario {
  pnombre: string;
}

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.page.html',
  styleUrls: ['./menu-profesor.page.scss'],
})
export class MenuProfesorPage implements OnInit {
  username: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async loadUserName() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('Docentes').doc(user.uid).get().toPromise();
      const userData = userDoc?.data() as Usuario | undefined;
      if (userData) {
        this.username = userData.pnombre || 'Usuario';
        console.log('Nombre de usuario cargado:', this.username); // Verificar en la consola
      } else {
        console.error('No se encontró el usuario en la colección Docentes.');
      }
    }
  }

  navigateToRevisarProfesor() {
    this.router.navigate(['/revisar-asistencia-profesor']);
  }

  navigateToRegistrarProfesor() {
    this.router.navigate(['/registrar-asistencia-profesor']);
  }
  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil-prof');
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/menu-profesor');
  }

  logout() {

    this.navCtrl.navigateRoot('/inicio-sesion');
  }



  ngOnInit() {
    this.loadUserName();
  }
}
