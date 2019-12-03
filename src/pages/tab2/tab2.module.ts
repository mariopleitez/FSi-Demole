import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tab2Page } from './tab2';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    Tab2Page,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(Tab2Page),
  ],
})
export class Tab2PageModule {}
