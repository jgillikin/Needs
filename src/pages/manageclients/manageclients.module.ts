import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageclientsPage } from './manageclients';

@NgModule({
  declarations: [
    ManageclientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageclientsPage),
  ],
})
export class ManageclientsPageModule {}
