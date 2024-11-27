import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { RevisarAsistenciaProfesorPage } from './revisar-asistencia-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarAsistenciaProfesorPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarAsistenciaProfesorPageRoutingModule {}
