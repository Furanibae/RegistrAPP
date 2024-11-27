import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface Asistencia {
  SiglaAsignatura: string;
  NombreAlumno: string;
  SeccionAsignatura: string;
  Fecha?: string;
  Hora?: string;
}

@Component({
  selector: 'app-revisar-asistencia-profesor',
  templateUrl: './revisar-asistencia-profesor.page.html',
  styleUrls: ['./revisar-asistencia-profesor.page.scss'],
})
export class RevisarAsistenciaProfesorPage implements OnInit {
  asistencias: { [key: string]: any[] } = {}; // Mapeo sigla -> asistencias
  asistenciaVisible: { [key: string]: boolean } = {}; // Mapeo sigla -> visibilidad del acordeón

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async loadAsistencias() {
    try {
      const asistenciaSnapshot = await this.firestore.collection('Asistencia').get().toPromise();
  
      if (asistenciaSnapshot && !asistenciaSnapshot.empty) {
        asistenciaSnapshot.forEach((doc) => {
          const asistencia = doc.data() as Asistencia; // Especifica el tipo de dato
          const sigla = asistencia.SiglaAsignatura;
  
          if (!this.asistencias[sigla]) {
            this.asistencias[sigla] = [];
          }
  
          this.asistencias[sigla].push(asistencia);
        });
  
        console.log('Asistencias cargadas:', this.asistencias);
      } else {
        console.error('No se encontraron registros en la colección Asistencia.');
      }
    } catch (error) {
      console.error('Error al cargar asistencias:', error);
    }
  }

  // Alternar visibilidad de asistencias por sigla
  toggleAsignatura(sigla: string) {
    this.asistenciaVisible[sigla] = !this.asistenciaVisible[sigla];
  }

  // Obtener las claves (siglas) de las asignaturas para iterar en el HTML
  getSiglas(): string[] {
    return Object.keys(this.asistencias);
  }

  // Navegar a la vista de perfil del profesor
  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil-prof');
  }

  // Navegar a la vista principal
  navigateToHome() {
    this.navCtrl.navigateRoot('/menu-principal');
  }

  // Cerrar sesión
  logout() {
    this.navCtrl.navigateRoot('/inicio-sesion');
  }

  // Volver a la página anterior
  goBack() {
    this.navCtrl.back();
  }

  // Inicializar la carga de datos
  ngOnInit() {
    this.loadAsistencias();
  }
}
