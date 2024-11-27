import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-exitoso',
  templateUrl: './qr-exitoso.page.html',
  styleUrls: ['./qr-exitoso.page.scss'],
})
export class QrExitosoPage implements OnInit {
  asistenciaData: any;

  constructor(private router: Router) { }

  ngOnInit() {

    const asistencia = localStorage.getItem('asistencia');
    if (asistencia) {
      this.asistenciaData = JSON.parse(asistencia);
      console.log('Datos recuperados de localStorage:', this.asistenciaData);
    } else {
      console.log('No se encontraron datos en localStorage');
    }
  }
  navigateToMenuPrincipal() {
    this.router.navigate(['/menu-principal']);
  }
}