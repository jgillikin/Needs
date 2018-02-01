import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Community } from './../../models/community/community';
import { HomePage } from '../home/home';
 


@Component({
  selector: 'page-manageclients',
  templateUrl: 'manageclients.html'
})
export class ManageclientsPage {

  platformList: string = '';
  isApp: boolean = true;
  community = {} as Community;
  com: AngularFireList<any> = this.db.list('/clients');
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

this.descRef = firebase.database().ref('/clients');

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
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}



removeItem(item) {
 
//alert("delete record "+item.id);

//delete from Firebase
this.com.remove(item.id).then(_ => console.log('deleted!'));

/*for(var i = 0; i < this.descList.length; i++) {
 
      if(this.descList[i] == item){
        this.descList.splice(i, 1);
      }
 
    }*/

}

editItem(item) {

 
//alert("delete record "+item.id);

//delete from Firebase
//this.com.remove(item.id).then(_ => console.log('deleted!'));

/*for(var i = 0; i < this.descList.length; i++) {
 
      if(this.descList[i] == item){
        this.descList.splice(i, 1);
      }
 
    }*/

}


}