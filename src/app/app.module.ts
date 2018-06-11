import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ApproveuserPage } from '../pages/approveuser/approveuser';
import { ApproveusereditPage } from '../pages/approveuseredit/approveuseredit';
import { MorePage } from '../pages/more/more';
import { CreedPage } from '../pages/creed/creed';
import { TabsPage } from '../pages/tabs/tabs';
import { RequestsPage } from '../pages/requests/requests';
import { RegisterPage } from '../pages/register/register';
import { AllopenPage } from '../pages/allopen/allopen';
import { AllclosedPage } from '../pages/allclosed/allclosed';
import { Allclosed2Page } from '../pages/allclosed2/allclosed2';
import { SearchopenPage } from '../pages/searchopen/searchopen';
import { SearchclosedPage } from '../pages/searchclosed/searchclosed';
import { LoginPage } from '../pages/login/login';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { NotificationsPage } from '../pages/notifications/notifications';
import { Notifications2Page } from '../pages/notifications2/notifications2';
import { ListcommunityPage } from '../pages/listcommunity/listcommunity';
import { ManageclientsPage } from '../pages/manageclients/manageclients';
import { ManageusersPage } from '../pages/manageusers/manageusers';
import { ManageneedsPage } from '../pages/manageneeds/manageneeds';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ApproveuserPage,
    MorePage,
    LoginPage,
    ResetpwdPage,
    ListcommunityPage,
    RegisterPage,
    NotificationsPage,
    Notifications2Page,
    RequestsPage,
    AllopenPage,
    SearchopenPage,
    AllclosedPage,
    Allclosed2Page,
    SearchclosedPage,
    ManageclientsPage,
    ManageneedsPage,
    ManageusersPage,
    ApproveusereditPage,
    CreedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ApproveuserPage,
    MorePage,
    LoginPage,
    ResetpwdPage,
    ListcommunityPage,
    RegisterPage,
    NotificationsPage,
    Notifications2Page,
    RequestsPage,
    AllopenPage,
    SearchopenPage,
    AllclosedPage,
    Allclosed2Page,
    SearchclosedPage,
    ManageclientsPage,
    ManageneedsPage,
    ManageusersPage,
    ApproveusereditPage,
    CreedPage
  ],
  providers: [
    AngularFireAuth,
    Toast,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
