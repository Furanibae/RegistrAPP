import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-revision',
  templateUrl: './lista-revision.page.html',
  styleUrls: ['./lista-revision.page.scss'],
})
export class ListaRevisionPage implements OnInit {
  asignatura: string = 'Sin Asignatura';
  constructor(private navCtrl: NavController,
              private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'] || 'Sin Asignatura';
    });

  }
  navigateToPerfil() {
    this.navCtrl.navigateForward('/perfil-prof');
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/menu-profesor');
  }

  logout() {

    this.navCtrl.navigateRoot('/inicio-sesion');
  }


  goBack() {
    this.navCtrl.back();
  } 

}
