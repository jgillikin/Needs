import { Component } from '@angular/core';
import { NavController,Platform,NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Community } from './../../models/community/community';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import {Http, Request, RequestMethod, Headers, URLSearchParams,RequestOptions} from "@angular/http";
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-searchopen',
  templateUrl: 'searchopen.html'
})
export class SearchopenPage {

  platformList: string = '';
  isApp: boolean = true;
  community = {} as Community;
  com: AngularFireList<any> = this.db.list('/communities');
  public descList:Array<any>;
  public descRef: firebase.database.Reference;
  public loadedDescList: Array<any>;
  public comSearch: any;
  nd: AngularFireList<any> = this.db.list('/needs');
  public reqName: any;
  public reqCell: any;
  public userRef: firebase.database.Reference;
  userId: any;
  http: Http;
  data: any = {};


  constructor(public navCtrl: NavController,
public platform: Platform,public db: AngularFireDatabase,public params: NavParams, http: Http,private toast: Toast,private toastCtrl: ToastController) {

      this.http = http;

      this.userId = firebase.auth().currentUser.uid;

      this.comSearch = this.params.get('comPassed');

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');

      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
}

this.descRef = firebase.database().ref('/needs');

this.descRef.on('value', descList => {
  let descs = [];
  descList.forEach( desc => {
//    descs.push(desc.val());
    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();
    //descs.push(desc.val()+" "+desc.key);

  //alert("status is "+weeklyData.record.status+" and community id is "+this.comSearch);

   if (weeklyData["record"].status == 'NEW' && weeklyData["record"].communityId == this.comSearch)
    descs.push(weeklyData);

  return false;
  });

//alert(descs[0].id);

  this.descList = descs;
this.descList = descs;
this.descList.sort(function(a, b) {
  // convert date object into number to resolve issue in typescript
  return  +new Date(a.record.dateSub) - +new Date(b.record.dateSub);
})
 // this.loadedDescList = descs;
});


this.userRef = firebase.database().ref('/users-list');

this.userRef.on('value', descList => {
  let descs4 = '';
  let descs5 = '';
 
  descList.forEach( desc => {

    var weeklyData = {};

    weeklyData["id"] = desc.key;
    weeklyData["record"] = desc.val();

    if (weeklyData["record"].uid == this.userId) {
     descs4=weeklyData["record"].fname+' '+weeklyData["record"].lname;
     descs5=weeklyData["record"].cell;
    }

  return false;
  });

  this.reqName = descs4;
  this.reqCell = descs5;
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

requestItem(item) {

  item.status = 'Requested';

//  alert("id is "+item.id+" and status is "+item.status);

//edit to Firebase

  this.nd.update(item.id, { status: 'Requested' });
  this.nd.update(item.id, { reqBy: this.userId });
  this.nd.update(item.id, { reqName: this.reqName });
  this.nd.update(item.id, { reqCell: this.reqCell });

  var mmsg = 'Please review a new Request for Need "'+item.record.desc+'"';


  var link2='https://warm-particle.glitch.me/login';



let params: URLSearchParams = new URLSearchParams();
 params.set('msg', mmsg);
 params.set('mto','["1'+item.record.advocateCell+'"]');

 //Http request-
 this.http.get(link2, {
   search: params
 }).subscribe(
   (response) => console.log('worked'), 
   (error) => console.log('error')
 );

//only send Email as an extra communicaton to Dick Powell
if (item.record.advocateName == 'Dick Powell') {

  let toS2: any;

  toS2 = 'dck92446@gmail.com';

  var link='https://jasongillikin.000webhostapp.com/blueEmail3.php';
  var myData;
  var message;
  myData = JSON.stringify({emailS: 'Please review a new Request for Need "'+item.record.desc+'"\n\nhttp://needs.city', toS: toS2});

this.http.post(link,myData)
  .subscribe(data => {
  this.data.response = "OK";
  }, error => {
  console.log("oops");
  });

} //end Dick Powell if 

if (this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`The Advocate has been contacted`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else if (this.platform.is('mobileweb')) {
 let toast = this.toastCtrl.create({
    message: 'The Advocate has been contacted',
    duration: 2000,
    position: 'bottom'
  });

toast.present();

}
else {
alert('The Advocate has been contacted');
return false;
}


this.navCtrl.setRoot(ContactPage);


}


}
