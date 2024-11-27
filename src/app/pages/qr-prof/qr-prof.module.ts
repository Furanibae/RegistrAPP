import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrProfPageRoutingModule } from './qr-prof-routing.module';

import { QrProfPage } from './qr-prof.page';

import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrProfPageRoutingModule,
    QrCodeModule
  ],
  declarations: [QrProfPage]
})
export class QrProfPageModule {}
