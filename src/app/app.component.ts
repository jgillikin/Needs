import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { StatusBar } from '@ionic-native/status-bar';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  private app;
  private platform;
  private user: firebase.User;

  constructor(app: App, platform: Platform,
		public afAuth: AngularFireAuth,private statusBar: StatusBar) {

           afAuth.authState.subscribe(user => {
			this.user = user;
});

		this.app = app;
		this.platform = platform;
           this.initializeApp();

/*const unsubscribe = afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.rootPage = TabsPage;
        unsubscribe();
      } else {
        this.rootPage = LoginPage;
        unsubscribe();
      }
    }); 

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); */

  }

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
});

this.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );
}


}
