import { Component } from '@angular/core';
import { NavController, MenuController  } from 'ionic-angular';
import { GetLinkPage } from '../get-link/get-link';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, menu: MenuController) {

  }

  goToLinkPage() {
    this.navCtrl.push(GetLinkPage);
  }


}
