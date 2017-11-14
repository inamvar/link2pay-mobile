import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { L2pService } from '../../services/index';
import * as moment from 'moment-jalaali';
import * as _ from 'lodash';
/**
 * Generated class for the LinksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage implements OnInit {


  ngOnInit(): void {
    this.presentLoading();
    this.getLinks(true)
      .then(response => {
        this.dismissLoading();
      });
  }

  page: number = 1;
  pageCount: number = 1;
  itemCount: number = 0;
  limit: number = 25;

  links: any[] = [];
  loader: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private l2pService: L2pService) {
      moment.loadPersian();
  }



  getLinks(reset?: boolean): Promise<any> {
    if (reset) {
      this.links = [];
    }

    return this.l2pService.links(this.page, this.limit)
      .then(response => {
        if (response.links) {
          this.pageCount = response.pageCount;
          this.itemCount = response.itemCount;
          _.forEach(response.links, (item: any) => {
            item['date'] = moment(new Date(item.created_at)).format('jYYYY/jMM/jDD hh:mm a');
            this.links.push(item);
          });
        }
      })
      .catch(error => {
        this.dismissLoading();
      });
  }

  doInfinite(infiniteScroll) {

    if (this.page + 1 <= this.pageCount) {
      this.page++;
      this.getLinks(false)
        .then(response => {
          infiniteScroll.complete();
        });
    } else {
      infiniteScroll.complete();
    }


  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "چند لحظه لطفا...."

    });
    this.loader.present();

  }

  dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}
