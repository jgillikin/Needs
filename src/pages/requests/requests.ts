import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Need } from './../../models/need/need';
import { HomePage } from '../home/home';
 


@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage {

  platformList: string = '';
  isApp: boolean = true;


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase) {

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}



  } //end constructor



}