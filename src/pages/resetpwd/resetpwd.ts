import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { AuthService } from '../../providers/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/*
  Generated class for the Resetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html'
})
export class ResetpwdPage {

  public resetpwdForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  email: string;

  constructor(public navCtrl: NavController, public authService: AngularFireAuth,public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {


    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetpwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

 async resetPwd() {

try {
      const result = await this.authService.auth.sendPasswordResetEmail(this.email);

//      if (result) {

        this.navCtrl.setRoot(LoginPage);
  //    }  
    }
    catch (e) {
      console.error(e);
    }


   /* if (!this.resetpwdForm.valid){
      console.log('not valid');
      return false;
    } else {
      return this.authService.auth.sendPasswordResetEmail(this.email);
       //this.navCtrl.setRoot(LoginPage);
    } */
   
  }

}