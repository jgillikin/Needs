import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Community } from './../../models/community/community';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
 


@Component({
  selector: 'page-listcommunity',
  templateUrl: 'listcommunity.html'
})
export class ListcommunityPage {

  platformList: string = '';
  isApp: boolean = true;
  community = {} as Community;
  com: AngularFireList<any> = this.db.list('/communities');
  userId: any;
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,private toast: Toast) {

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/communities');

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
  //this.loadedDescList = descs;
});

  } //end constructor
ionViewDidLoad() {
this.userId = firebase.auth().currentUser.uid;
}


onSave(com2: Community) {

//alert("in onSave and com is "+com2.name);

if (!com2.name) {

if (this.platform.is('android') || this.platform.is('ios')  || this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Please enter a Community name`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else {
alert('Please enter a Community name');
return false;
}

}


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

this.navCtrl.setRoot(ListcommunityPage);

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

}