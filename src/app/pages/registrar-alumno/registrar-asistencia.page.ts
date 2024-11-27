
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


interface Alumno {
  sigla1?: string;
  sigla2?: string;
  sigla3?: string;
  seccion1?: string;
  seccion2?: string;
  seccion3?: string;
}
interface Asignatura {
  asignatura: string;
  sigla: string;
  seccion: string; 
}


@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  asignaturas: any[] = [];


  constructor(private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }
  async loadAsignaturas() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const alumnoDoc = await this.firestore.collection('Alumnos').doc(user.uid).get().toPromise();
      const alumnoData = alumnoDoc?.data() as Alumno;
  
      if (alumnoData) {
        // Obtener siglas y secciones
        const siglas = [alumnoData.sigla1, alumnoData.sigla2, alumnoData.sigla3];
        const secciones = [alumnoData.seccion1, alumnoData.seccion2, alumnoData.seccion3];
  
        // Obtener las asignaturas que corresponden a las siglas
        const asignaturasSnapshot = await this.firestore
          .collection('Asignaturas', ref => ref.where('sigla', 'in', siglas))
          .get()
          .toPromise();
  
        // Mapear las asignaturas a un objeto que incluya la sección
        this.asignaturas = asignaturasSnapshot?.docs.map((doc, index) => {
          const data = doc.data() as Asignatura;
          return {
            asignatura: data.asignatura,
            sigla: data.sigla,
            seccion: secciones[index] || 'N/A', // Asocia la sección según el índice
          };
        }) || [];
      } else {
        console.error('No se encontró el alumno en la colección Alumnos.');
      }
    }
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
  navigateToQRScan() {
    this.navCtrl.navigateForward('/qr-alumn');}

 ngOnInit() {
    this.loadAsignaturas();
  }


}