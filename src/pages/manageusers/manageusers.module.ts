import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageusersPage } from './manageusers';

@NgModule({
  declarations: [
    ManageusersPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageusersPage),
  ],
})
export class ManageusersPageModule {}
