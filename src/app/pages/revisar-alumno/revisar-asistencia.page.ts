import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-revisar-asistencia',
  templateUrl: './revisar-asistencia.page.html',
  styleUrls: ['./revisar-asistencia.page.scss'],
})
export class RevisarAsistenciaPage implements OnInit {
  asignaturas: any[] = [];
  asistencias: { [key: string]: any[] } = {}; // Mapeo sigla -> asistencias
  asistenciaVisible: { [key: string]: boolean } = {}; // Mapeo sigla -> visibilidad del acordeón

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async loadAsignaturas() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const alumnoDoc = await this.firestore.collection('Alumnos').doc(user.uid).get().toPromise();
      const alumnoData = alumnoDoc?.data() as any;
  
      if (alumnoData) {
        console.log('Datos del alumno cargados:', alumnoData);
  
        const siglas = [alumnoData.sigla1, alumnoData.sigla2, alumnoData.sigla3];
        console.log('Siglas del alumno:', siglas);
  
        const nombreAlumno = `${alumnoData.pnombre} ${alumnoData.papellido}`;
        console.log('Nombre completo del alumno:', nombreAlumno);
  
        const asignaturasSnapshot = await this.firestore
          .collection('Asignaturas', ref => ref.where('sigla', 'in', siglas))
          .get()
          .toPromise();
  
        this.asignaturas = asignaturasSnapshot?.docs.map(doc => doc.data()) || [];
        console.log('Asignaturas encontradas:', this.asignaturas);
  
        this.loadAsistencias(siglas, nombreAlumno);
      } else {
        console.error('No se encontró el alumno en la colección Alumnos.');
      }
    }
  }

  async loadAsistencias(siglas: string[], nombreAlumno: string) {
    for (const sigla of siglas) {
      try {
        console.log(`Cargando asistencias para Sigla: ${sigla}, NombreAlumno: ${nombreAlumno}`);
        
        // Realiza la consulta
        const asistenciaSnapshot = await this.firestore
          .collection('Asistencia', ref =>
            ref.where('SiglaAsignatura', '==', sigla)
          )
          .get()
          .toPromise();
  
        // Verifica si la consulta devolvió datos
        if (asistenciaSnapshot && asistenciaSnapshot.docs) {
          console.log(`Documentos encontrados para ${sigla}:`, asistenciaSnapshot.docs.map(doc => doc.data()));
  
          this.asistencias[sigla] = asistenciaSnapshot.docs.map(doc => doc.data()) || [];
          console.log(`Asistencias encontradas para ${sigla}:`, this.asistencias[sigla]);
  
          if (this.asistencias[sigla].length === 0) {
            console.log(`No se encontraron asistencias para la sigla ${sigla}`);
          }
        } else {
          console.log(`No se encontraron documentos para la sigla ${sigla}`);
        }
      } catch (error) {
        console.error(`Error al cargar asistencias para la sigla ${sigla}:`, error);
      }
    }
  }
  
  

  toggleAsignatura(sigla: string) {
    this.asistenciaVisible[sigla] = !this.asistenciaVisible[sigla];
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
    this.loadAsignaturas();
  }
}
