import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDonatePage } from './post-donate';

@NgModule({
  declarations: [
    PostDonatePage,
  ],
  imports: [
    IonicPageModule.forChild(PostDonatePage),
  ],
})
export class PostDonatePageModule {}
