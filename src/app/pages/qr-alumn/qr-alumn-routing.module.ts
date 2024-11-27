import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrAlumnPage } from './qr-alumn.page';

const routes: Routes = [
  {
    path: '',
    component: QrAlumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrAlumnPageRoutingModule {}
