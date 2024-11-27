import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrExitosoPageRoutingModule } from './qr-exitoso-routing.module';

import { QrExitosoPage } from './qr-exitoso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrExitosoPageRoutingModule
  ],
  declarations: [QrExitosoPage]
})
export class QrExitosoPageModule {}
