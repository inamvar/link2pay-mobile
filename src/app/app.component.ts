import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TerminalsPage } from '../pages/terminals/terminals';
import { LinksPage } from '../pages/links/links';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any = HomePage;
  display_name:string = '';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController) {
    let token = localStorage.getItem('x-access-token');
    this.rootPage = HomePage;
    if (!token || token.length == 0) {
      this.rootPage = LoginPage;
   
    } else {
     // this.rootPage = HomePage;
      this.display_name  = localStorage.getItem('display_name');
    }
    platform.setDir('rtl', true);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    menu.enable(true);
  }

  home(){
    this.rootPage = HomePage;
    this.menu.close();
  }
  logout(){
    localStorage.clear();
    this.rootPage = LoginPage;
    this.menu.close();
    this.nav.setRoot(LoginPage);
    this.nav.popToRoot();
  }

  terminals(){
 
    this.menu.close();
    this.nav.push(TerminalsPage);
  }

  links(){
       this.menu.close();
       this.nav.push(LinksPage);
     }
}

