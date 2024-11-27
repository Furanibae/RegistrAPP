import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAsistenciaProfesorPage } from './registrar-asistencia-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAsistenciaProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAsistenciaProfesorPageRoutingModule {}
