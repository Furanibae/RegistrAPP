import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarAsistenciaPageRoutingModule } from './revisar-asistencia-routing.module';

import { RevisarAsistenciaPage } from './revisar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarAsistenciaPageRoutingModule
  ],
  declarations: [RevisarAsistenciaPage]
})
export class RevisarAsistenciaPageModule {}
