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
  escuela: string;
  sede: string;
}


@Component({
  selector: 'app-perfil-prof',
  templateUrl: './perfil-prof.page.html',
  styleUrls: ['./perfil-prof.page.scss'],
})
export class PerfilProfPage implements OnInit {
  usuario: Usuario | undefined;


  constructor(private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }


  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('Docentes').doc(user.uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        this.usuario = userDoc.data() as Usuario;
         console.log('Datos del usuario cargados:', this.usuario);
      } else {
        console.error('No se encontró el usuario en la colección Alumnos.');
      }
    }
  }
  


  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.loadUserData();
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
}
