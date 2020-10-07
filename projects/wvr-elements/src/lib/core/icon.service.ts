import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../shared/config/app-config';
import { Icon } from '../wvr-icon/icon';
import { IconSet } from '../wvr-icon/icon-set';

/**
 * A registry for each IconSet currently in use by any Icon Component.
 */
@Injectable({
  providedIn: 'root'
})
export class IconService {

  /** A registry of all icon sets. */
  private readonly _iconRegister: Map<string, IconSet> = new Map<string, IconSet>();

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig
  ) {
  }

  /** Registers an IconSet with the _iconRegister. */
  registerIcons(icons: IconSet): void {
    this._iconRegister.set(icons.name, icons);
  }

  /** Retrieves the specified icon from the _iconRegister. If the specified icon has not been retrieved previsouly it registers it. */
  getIcon(set: string, name: string): Observable<string> {
    const iSet = this.getOrSetIconSet(set);

    return this.getOrSetIcon(iSet, name).svg;
  }

  /** Retireves the IconSet from the _iconRegister, or sets it if it has not been previously registered. */
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

  /** Retireves the Icon from the IconSet, or sets it if it has not been previously registered. */
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

  /** Initialized the http request for the specified icon.  */
  private fetchIcon(set: IconSet, name: string): Observable<string> {

    return this.http.get(`${this.appConfig.assetsUrl}/icons/${set.name}/${name}.svg`, { responseType: 'text' })
      .pipe(share());
  }

}
