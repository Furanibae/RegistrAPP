import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  loading: boolean = true;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    
    setTimeout(() => {
      this.loading = false;
      this.redirectToOtherPage();
    }, 3000); // 3000 milisegundos = 3 segundos
  }

  redirectToOtherPage() {
    
    this.navCtrl.navigateForward('/inicio-sesion'); 
  }
}

