import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarAsistenciaProfesorPageRoutingModule } from './revisar-asistencia-profesor-routing.module';

import { RevisarAsistenciaProfesorPage } from './revisar-asistencia-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarAsistenciaProfesorPageRoutingModule
  ],
  declarations: [RevisarAsistenciaProfesorPage]
})
export class RevisarAsistenciaProfesorPageModule {}
