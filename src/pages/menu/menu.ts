import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  display_name:string = '';
  
  constructor(public navCtrl: NavController) {
    this.display_name  = localStorage.getItem('display_name');
  }


  logout(){
    localStorage.clear();
    this.navCtrl.popToRoot();
  }
}
