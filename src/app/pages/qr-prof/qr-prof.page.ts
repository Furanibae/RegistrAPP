import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// Declare the QRCode module as any
declare var require: any;
const QRCode = require('qrcode');

@Component({
  selector: 'app-qr-prof',
  templateUrl: './qr-prof.page.html',
  styleUrls: ['./qr-prof.page.scss'],
})
export class QrProfPage implements OnInit {
  qrData: string = '';
  qrCodeUrl: string = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        const asignatura = params['asignatura'];
        const sigla = params['sigla'];
        const seccion = params['seccion'];
        
        // Generar datos para el QR
        this.qrData = `Asignatura: ${asignatura}, Sigla: ${sigla}, Sección: ${seccion}`;
        
        // Generar el código QR
        QRCode.toDataURL(this.qrData)
          .then((url: any) => { // Specify the type as any
            this.qrCodeUrl = url;
          })
          .catch((err: any) => { // Specify the type as any
            console.error(err);
          });
      }
    });
  }

  goBack() {
    this.navCtrl.back();
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
