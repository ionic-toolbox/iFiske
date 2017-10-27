import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreasDetailInfoPage } from './areas-detail-info';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AreasDetailInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AreasDetailInfoPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class AreasDetailInfoPageModule {}
