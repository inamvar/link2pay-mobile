import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { L2pService } from '../../services/index';

@Component({
  selector: 'page-get-link',
  templateUrl: 'get-link.html'
})
export class GetLinkPage {
  terminal: any;
  amount: number = 0;
  payer_name: string = '';
  payer_mobile: string = '';
  link: string = '';
  result : string;
  message: string = '';
  loader: any;
  constructor(
    public navCtrl: NavController,
    menu: MenuController,
    private l2pService: L2pService,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController) {

  }

  getLink() {
    this.presentLoading();
    this.getTerminal()
      .then(terminal => {
        if (terminal) {
          this.l2pService.createLink(this.amount, this.payer_name, this.payer_mobile, terminal.uuid)
            .then(result => {
              if (result.success == true) {
                this.result = JSON.stringify(result, null, "\t");
                this.link = result.shortLink;
                this.message = ' یک صورت حساب به مبلغ '
                  + this.amount
                  + ' ریال از طرف '
                  + localStorage.getItem('display_name')
                  + ' برای شما صادر شده است. لطفا برای پرداخت آن از لینک زیر استفاده نمایید.\n\r'
                  + this.link;

                this.dismissLoading();
              } else {
                console.error(result);
                this.dismissLoading();
              }
            })
            .catch(e => {
              this.dismissLoading();
            });
        }
      })
  }


  getTerminal() {

    return this.l2pService.getTerminals()
      .then(result => {
        if (result.success == true) {
          return result.terminals[0];
        } else {
          console.error(result);
          this.dismissLoading();
          return null;
        }
      }).catch(error => {
        console.error(error);
        this.dismissLoading();
      })
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

  onSms() {
    this.socialSharing.shareViaSMS(this.message, this.payer_mobile).then(() => {
      this.presentToast('پیامک ارسال شد');
    }).catch(e => {
      this.presentToast(e);
    });
  }
  onWhatsApp() {
    this.socialSharing.shareViaWhatsApp(this.message, null, this.link).then(() => {
      this.presentToast('پیام به واتس اپ ارسال شد');
    }).catch(e => {
      this.presentToast(e);
    });
  }

  onTelegram() {
    this.socialSharing.shareVia('Telegram', this.message, null, this.link).then(() => {
      this.presentToast('پیام به تلگرام ارسال شد');
    }).catch(e => {
      this.presentToast(e);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

