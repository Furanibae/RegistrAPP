import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrProfPage } from './qr-prof.page';

const routes: Routes = [
  {
    path: '',
    component: QrProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrProfPageRoutingModule {}
