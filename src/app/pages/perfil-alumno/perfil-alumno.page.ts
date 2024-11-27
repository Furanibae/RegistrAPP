import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Usuario {
  pnombre: string;
  papellido: string;
  sapellido: string;
  snombre?: string;
  rut: string;
  correo: string;
  carrera: string;
  sede: string;
}

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {
  usuario: Usuario | undefined;

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('Alumnos').doc(user.uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        this.usuario = userDoc.data() as Usuario;
        console.log('Datos del usuario cargados:', this.usuario);
      } else {
        console.error('No se encontró el usuario en la colección Alumnos.');
      }
    }
  }

  ngOnInit() {
    this.loadUserData();
  }

  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil-alumno');
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/menu-principal');
  }

  logout() {
    this.navCtrl.navigateRoot('/inicio-sesion');
  }

  goBack() {
    this.navCtrl.back();
  }
}
