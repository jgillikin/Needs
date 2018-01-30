import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchopenPage } from './searchopen';

@NgModule({
  declarations: [
    SearchopenPage,
  ],
  imports: [
    IonicPageModule.forChild(AllopenPage),
  ],
})
export class SearchopenPageModule {}
