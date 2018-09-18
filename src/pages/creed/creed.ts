import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RequestsPage } from '../requests/requests';
import { Need } from './../../models/need/need';
import {Http, Request, RequestMethod, Headers} from "@angular/http";
//import { NotificationsPage } from './notifications';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-creed',
  templateUrl: 'creed.html'
})
export class CreedPage {

  platformList: string = '';
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  ul: AngularFireList<any> = this.db.list('/users-list');
  userId: any;
  public descList:Array<any>;
  public descList2:Array<any>;
  public descList3:Array<any>;
  public descRef: firebase.database.Reference;
  public userRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  http: Http;
  data: any = {};
  public reqName: any;

pushPage: any;

section
groceries

constructor(public navCtrl: NavController,
public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase,http: Http,public viewCtrl: ViewController) {

this.http = http;

this.userId = firebase.auth().currentUser.uid;

this.pushPage = HomePage;

this.section = "one";

let platforms = this.platform.platforms();

        this.platformList = platforms.join(', ');

     if (this.platform.is('core') ||                	     	this.platform.is('mobileweb')) {
     this.isApp = false;
      }


  this.groceries = [
            'Requests',
            'In Progress',
            'Work Finished'
        ];


  } //end constructor



logout(){
//alert("in logout");

/*    this.afA.auth.signOut().then(() => {
       this.navCtrl.push(LoginPage);
    }) */

this.viewCtrl.dismiss();

}

}
