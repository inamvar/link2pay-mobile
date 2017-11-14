import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { L2pService } from '../../services/index';

@Component({
  selector: 'page-terminals',
  templateUrl: 'terminals.html'
})
export class TerminalsPage implements OnInit {

  terminals: any[];

  constructor(public navCtrl: NavController, private l2pService: L2pService) {

  }

  ngOnInit(): void {
    this.getTerminals();
  }

  getTerminals() {
    this.l2pService.getTerminals()
      .then(result => {
        if (result.success == true) {
          this.terminals = result.terminals;

        } else {
          console.error(result);
          this.terminals = [];
        }
      }).catch(error => {
        console.error(error);
      });
  }
}
