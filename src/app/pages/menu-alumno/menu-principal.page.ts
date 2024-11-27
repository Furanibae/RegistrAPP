import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


interface Usuario {
  pnombre: string;
}

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
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
      const userDoc = await this.firestore.collection('Alumnos').doc(user.uid).get().toPromise();
      const userData = userDoc?.data() as Usuario | undefined;
      if (userData) {
        this.username = userData.pnombre || 'Usuario';
        console.log('Nombre de usuario cargado:', this.username); // Verificar en la consola
      } else {
        console.error('No se encontró el usuario en la colección Alumnos.');
      }
    }
  }
  navigateToRevisar() {
    this.router.navigate(['/revisar-asistencia']);
  }

  navigateToRegistrar() {
    this.router.navigate(['/registrar-asistencia']);
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

  ngOnInit() {
    this.loadUserName();

  }
}
