import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RequestsPage } from '../requests/requests';
import { Need } from './../../models/need/need';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  platformList: string = '';
  isApp: boolean = true;
  need = {} as Need;
  nd: AngularFireList<any> = this.db.list('/needs');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;


pushPage: any;

section
groceries

constructor(public navCtrl: NavController, 
public platform: Platform,
public afA: AngularFireAuth,public db: AngularFireDatabase) {

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
			      
  this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);
    descs.push(weeklyData);
  return false;
  });

 //alert(descs[0].id);

  this.descList = descs;
  this.loadedDescList = descs;
});


  } //end constructor

logout(){
//alert("in logout");
    this.afA.auth.signOut().then(() => {
       this.navCtrl.push(LoginPage);
    })
}

  page1: any = RequestsPage;
/*  page2: any = InprogressPage;
  page3: any = WorkfinishedPage; */

  
}
