import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrExitosoPage } from './qr-exitoso.page';

const routes: Routes = [
  {
    path: '',
    component: QrExitosoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrExitosoPageRoutingModule {}
