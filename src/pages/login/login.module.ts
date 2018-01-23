import { LoginPage } from './login';
import { IonicPageModule} from 'ionic-angular/module';
import { NgModule } from '@angular/core';

@NgModule ({
declarations: [LoginPage],
imports: [IonicPageModule.forChild(LoginPage)]

})
export class LoginModule {

}
