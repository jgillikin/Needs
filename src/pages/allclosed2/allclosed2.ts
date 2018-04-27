import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Community } from './../../models/community/community';
import { HomePage } from '../home/home';
 


@Component({
  selector: 'page-allclosed2',
  templateUrl: 'allclosed2.html'
})
export class Allclosed2Page {

  platformList: string = '';
  isApp: boolean = true;
  community = {} as Community;
  com: AngularFireList<any> = this.db.list('/communities');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase) {

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
   if (weeklyData["record"].status == 'CLOSED')
    descs.push(weeklyData);

  return false;
  });


  this.descList = descs;

this.descList.sort(function(a, b) {
  // convert date object into number to resolve issue in typescript
  return  +new Date(a.record.dateComp) - +new Date(b.record.dateComp);
})

});


  } //end constructor

ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(com2: Community) {

//alert("in onSave and fname is "+cl2.fname+" and lname is "+cl2.lname+" and cell is "+cl2.cell+" and community is "+cl2.community);

let today:any = new Date();
let dd:any = today.getDate();
let mm:any = today.getMonth()+1; //January is 0!

let yyyy:any = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;


 this.com.push({
 "name": com2.name,
 "zip": com2.zip,
 "addedBy": this.userId,
  "dateAdded": today
}); 

this.navCtrl.setRoot(HomePage);

}

}