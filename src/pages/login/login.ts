import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { User } from './../../models/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireAction,AngularFireList } from 'angularfire2/database';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  platformList: string = '';

  us: AngularFireList<any> = this.db.list('/users-list');

  
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public db: AngularFireDatabase, public navParams: NavParams,private toast: Toast,private toastCtrl: ToastController,
public platform: Platform) {

      let platforms = this.platform.platforms();

      this.platformList = platforms.join(', ');


    
  }
 
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }  
    }
    catch (e) {

      if (this.platform.is('tablet') || this.platform.is('ipad') ) {
this.toast.show(`Invalid Password.`, '3000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
return false;
}
else if (this.platform.is('mobileweb')) {
 let toast = this.toastCtrl.create({
    message: 'Invalid Password.',
    duration: 2000,
    position: 'bottom'
  });

toast.present();

}
else {
alert('Invalid Password.');
return false;
}


      console.error(e);
    }
  }

 goRegister() {
  this.navCtrl.push(RegisterPage);
 }

 resetPwd(){
    this.navCtrl.push(ResetpwdPage);
  }
 
  async register(user: User) {

 return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => {
       
        this.us.push({
 "email": this.user.email,
 "uid": user.user.uid
}); 


this.navCtrl.setRoot(TabsPage);

      })
.catch((error) => this.handleError(error) );

  /*  try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        

        this.navCtrl.setRoot(TabsPage);
      }
    } catch (e) {
      console.error(e);
    } */

  }

// If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    //this.notify.update(error.message, 'error');
  }

}