import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarAsistenciaPage } from './revisar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarAsistenciaPageRoutingModule {}
