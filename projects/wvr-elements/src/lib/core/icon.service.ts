import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../shared/config/app-config';
import { Icon } from '../wvr-icon/icon';
import { IconSet } from '../wvr-icon/icon-set';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private readonly _iconRegister: Map<string, IconSet> = new Map<string, IconSet>();

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {

  }

  registerIcons(icons: IconSet): void {
    this._iconRegister.set(icons.name, icons);
  }

  getIcon(set: string, name: string): Observable<string> {
    const iSet = this.getOrSetIconSet(set);

    return this.getOrSetIcon(iSet, name).svg;
  }

  private getOrSetIconSet(set: string): IconSet {
    let iSet = this._iconRegister.get(set);
    if (iSet) {
      return iSet;
    }
    iSet = {
      name: set,
      icons: []
    };
    this._iconRegister.set(set, iSet);

    return iSet;
  }

  private getOrSetIcon(set: IconSet, name: string): Icon {
    let icon: Icon = set.icons
      .find(i => i.name === name);
    if (icon) {
      return icon;
    }
    icon = {
      name,
      svg: this.fetchIcon(set, name)
    };
    set.icons.push(icon);

    return icon;
  }

  private fetchIcon(set: IconSet, name: string): Observable<string> {

    return this.http.get(`${this.appConfig.assetUrl}/icons/${set.name}/${name}.svg`, { responseType: 'text' })
      .pipe(share());
  }

}
