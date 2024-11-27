import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRevisionPage } from './lista-revision.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRevisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaRevisionPageRoutingModule {}
