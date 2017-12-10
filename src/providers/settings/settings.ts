import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
// import { PushProvider } from '../push/push';

interface Settings {
  push: boolean;
  language: string;
}

export interface Language {
  short: string;
  long: string;
}

@Injectable()
export class SettingsProvider {
  private static STORAGE_LOCATION = 'settings';
  private static defaultSettings = {
    push: true,
    language: 'sv',
  }
  private settings: Settings = JSON.parse(localStorage.getItem(SettingsProvider.STORAGE_LOCATION));

  constructor(
    private translate: TranslateService,
    // private pushProvider: PushProvider,
  ) {
    if (!this.settings) {
      this.settings = SettingsProvider.defaultSettings;
      this.persistSettings();
    }
    console.log(this.settings);
  }

  private persistSettings() {
    localStorage.setItem(SettingsProvider.STORAGE_LOCATION, JSON.stringify(this.settings));
  }

  availableLanguages: {[short: string]: Language} = {
    sv: {
      short: 'sv',
      long: 'Svenska',
    },
    en: {
      short: 'en',
      long: 'English',
    },
    de: {
      short: 'de',
      long: 'Deutsch',
    },
  };

  get language() {
    return this.settings.language;
  }

  set language(lang: string) {
    this.settings.language = lang;
    this.persistSettings();
    this.translate.use(this.settings.language);

    // TODO: analytics
    // analytics.trackEvent('Language', 'changed', settings.language);
  }

  get push() {
    return this.settings.push;
  }

  set push(push: boolean) {
    this.settings.push = push;
    // this.pushProvider.reset();
    this.persistSettings();
  }
}
