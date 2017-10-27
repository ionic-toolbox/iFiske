import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkyModule } from 'angular-linky';
import { InformationDetailPage } from './information-detail';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InformationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InformationDetailPage),
    TranslateModule.forChild(),
    PipesModule,
    LinkyModule,
  ],
})
export class InformationDetailPageModule {}
