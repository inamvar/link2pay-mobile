import { Component } from '@angular/core';

import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { L2pService } from '../../services/index';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  error: string = '';
  waiting: boolean = false;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private l2pService: L2pService,
    public loadingCtrl: LoadingController) {

    this.waiting = this.l2pService.loading;
  }

  login() {
    this.presentLoading();
    this.l2pService.login(this.username, this.password)
      .then(result => {
        if (result && result.success == true) {
          this.dismissLoading();
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.popToRoot();

        } else {
          this.error = result.message;
          this.showAlert('توجه!', result.message);
          this.dismissLoading();
        }
      })
      .catch(error => {
        this.showAlert('توجه!', error.message || error);
        this.dismissLoading();
      });
  }



  private showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "چند لحظه لطفا...."

    });
    this.loader.present();

  }

  dismissLoading() {
    this.loader.dismiss();
  }

}
