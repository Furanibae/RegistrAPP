import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaRevisionPageRoutingModule } from './lista-revision-routing.module';

import { ListaRevisionPage } from './lista-revision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaRevisionPageRoutingModule
  ],
  declarations: [ListaRevisionPage]
})
export class ListaRevisionPageModule {}
