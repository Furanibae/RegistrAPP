import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface Docente {
  sigla1?: string;
  sigla2?: string;
  sigla3?: string;
}

interface Asignatura {
  asignatura: string;
  sigla: string;
  seccion1: string;
  seccion2: string;
  seccion3: string;
}

@Component({
  selector: 'app-registrar-asistencia-profesor',
  templateUrl: './registrar-asistencia-profesor.page.html',
  styleUrls: ['./registrar-asistencia-profesor.page.scss'],
})

export class RegistrarAsistenciaProfesorPage implements OnInit {
  asignaturas: Asignatura[] = [];
  qrCodeImageUrl: string | null = null; // Variable para almacenar la URL del QR

  constructor(private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  async loadAsignaturas() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const docenteDoc = await this.firestore.collection('Docentes').doc(user.uid).get().toPromise();
      const docenteData = docenteDoc?.data() as any;

      if (docenteData) {
        const siglas = [docenteData.sigla1, docenteData.sigla2, docenteData.sigla3];
        const asignaturasSnapshot = await this.firestore
          .collection('Asignaturas', ref => ref.where('sigla', 'in', siglas))
          .get()
          .toPromise();

        this.asignaturas = asignaturasSnapshot?.docs.map(doc => doc.data() as Asignatura) || [];
      } else {
        console.error('No se encontró el docente en la colección Docentes.');
      }
    }
  }  

  // Nueva función para generar el QR
  generateQRCode(asignatura: Asignatura, section: string) {
    const qrCodeData = `Asignatura: ${asignatura.asignatura}, Sigla: ${asignatura.sigla}, Sección: ${section}`;
    this.qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=200x200`;
  }

  goBack() {
    this.navCtrl.back();
  }

  navigateToQrProf(asignatura: string, sigla: string, seccion: string) {
    this.navCtrl.navigateForward('/qr-prof', {
      queryParams: { asignatura, sigla, seccion }
    });
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
    this.loadAsignaturas();
  }
}