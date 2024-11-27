import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


interface AsistenciaData {
  NombreAlumno: string;
  Profesor: string;
  SeccionAsignatura: string;
  SiglaAsignatura: string;
  
}
interface DocenteData {
  pnombre: string;
  sigla1: string;
  sigla2: string;
  sigla3: string;
}


@Component({
  selector: 'app-qr-alumn',
  templateUrl: './qr-alumn.page.html',
  styleUrls: ['./qr-alumn.page.scss'],
})
export class QrAlumnPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  constructor(private navCtrl: NavController, private alertController: AlertController,private firestore: AngularFirestore,
    private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      if (this.isSupported) {
        this.installGoogleBarcodeScannerModule();
      }
    });
  }
  async installGoogleBarcodeScannerModule(): Promise<void> {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log("Google Barcode Scanner module installation started.");
      BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (progress) => {
        console.log('Installation progress:', progress);
        if ((progress as any).percentage === 100) {
          console.log("Google Barcode Scanner module installed successfully.");
        }
      });
    } catch (error) {
      console.error("Error installing Google Barcode Scanner module:", error);
    }
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  
    if (barcodes.length > 0) {
      const scannedData = barcodes[0].rawValue;
      const [asignatura, sigla, seccion] = this.extractQRData(scannedData);
  
      // Validar datos extraídos del QR
      if (!asignatura || !sigla || !seccion) {
        console.error('Datos del QR no válidos.');
        return;
      }
  
      // Llama al método para guardar en Firebase
      await this.guardarAsistencia(asignatura, sigla, seccion);
    }
  }
    //GUARDADO DE ASISTENCIA_________________________________________________________________________________________
    extractQRData(data: string): [string, string, string] {
      const regex = /Asignatura: (.*), Sigla: (.*), Sección: (.*)/;
      const match = data.match(regex);
      return match ? [match[1], match[2], match[3]] : ['', '', ''];
    }


    async guardarAsistencia(asignatura: string, sigla: string, seccion: string) {
      const user = await this.afAuth.currentUser;
    
      if (user) {
        const alumnoDoc = await this.firestore.collection('Alumnos').doc(user.uid).get().toPromise();
        const alumnoData = alumnoDoc?.data() as { pnombre: string, sigla1: string, sigla2: string, sigla3: string } | undefined;
    
        if (alumnoData) {
          let profesorData: DocenteData | null = null;
    
          const docenteDocsPromises = [
            this.firestore.collection('Docentes').ref.where('sigla1', '==', sigla).get(),
            this.firestore.collection('Docentes').ref.where('sigla2', '==', sigla).get(),
            this.firestore.collection('Docentes').ref.where('sigla3', '==', sigla).get()
          ];
    
          const docenteDocs = await Promise.all(docenteDocsPromises);
    
          for (const docenteDoc of docenteDocs) {
            if (!docenteDoc.empty) {
              profesorData = docenteDoc.docs[0].data() as DocenteData;
              break;
            }
          }
    
          if (profesorData) {
            const asistenciaData = {
              NombreAlumno: alumnoData.pnombre,
              Profesor: profesorData.pnombre,
              SeccionAsignatura: seccion,
              SiglaAsignatura: sigla,
              Fecha: new Date().toLocaleString()
            };
    
            // Guarda los datos en Firebase
            await this.firestore.collection('Asistencia').add(asistenciaData);
            console.log('Asistencia guardada exitosamente');
    
            localStorage.setItem('asistencia', JSON.stringify(asistenciaData));
    
            // Navega a la página qr-exitoso
            this.router.navigate(['/qr-exitoso']);
          } else {
            console.error('No se encontró el docente para la asignatura');
          }
        } else {
          console.error('No se encontró el alumno');
        }
      }
    }
    
  
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Dale permisos a la cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }

  navigateToQrExitoso() {
    this.router.navigate(['/qr-exitoso']);
  }
}
