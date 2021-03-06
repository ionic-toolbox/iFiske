import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;

  constructor(private userProvider: UserProvider, private viewCtrl: ViewController) {}

  async ionViewWillEnter() {
    this.user = await this.userProvider.getInfo();
  }

  close() {
    return this.viewCtrl.dismiss();
  }

  async logout() {
    await this.userProvider.logout();
    return this.close();
  }
}
