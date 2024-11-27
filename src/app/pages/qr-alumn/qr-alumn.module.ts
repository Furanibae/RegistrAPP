import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrAlumnPageRoutingModule } from './qr-alumn-routing.module';

import { QrAlumnPage } from './qr-alumn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrAlumnPageRoutingModule
  ],
  declarations: [QrAlumnPage]
})
export class QrAlumnPageModule {}
