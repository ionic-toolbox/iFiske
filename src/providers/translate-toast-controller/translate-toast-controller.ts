import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, ToastOptions, Toast } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the TranslateToastControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslateToastController {

  constructor(private translate: TranslateService, private toastCtrl: ToastController) {
  }

  async create(opts?: ToastOptions): Promise<Toast> {
    const toTranslate = ['message', 'closeButtonText'];
    if (opts) {
      for (const key of toTranslate) {
        if (opts[key]) {
          opts[key] = await this.translate.get(opts[key]).toPromise();
        }
      }
    }
    return this.toastCtrl.create(opts);
  }



}
