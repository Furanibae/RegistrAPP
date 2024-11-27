import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciaProfesorPageRoutingModule } from './registrar-asistencia-profesor-routing.module';

import { RegistrarAsistenciaProfesorPage } from './registrar-asistencia-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciaProfesorPageRoutingModule
  ],
  declarations: [RegistrarAsistenciaProfesorPage]
})
export class RegistrarAsistenciaProfesorPageModule {}
