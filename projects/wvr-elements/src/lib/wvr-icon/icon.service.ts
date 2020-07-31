import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ConfigService } from '../shared/config.service';
import { Icon } from './icon';
import { IconSet } from './icon-set';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  iconRegister: Map<string, IconSet> = new Map<string, IconSet>();

  private readonly ASSET_PATH: string;

  constructor(private http: HttpClient, config: ConfigService) {
    this.ASSET_PATH = `${config.baseUrl}/assets`;
  }

  registerIcons(icons: IconSet): void {
    this.iconRegister.set(icons.name, icons);
  }

  getIcon(set: string, name: string): Observable<string> {
    const iSet = this.getOrSetIconSet(set);

    return this.getOrSetIcon(iSet, name).svg;
  }

  private addIcon(set: string, icon: Icon): void {
    this.getOrSetIconSet(set).icons.push(icon);
  }

  private fetchIcon(set: IconSet, name: string): Observable<string> {

    return this.http.get(`${this.ASSET_PATH}/icons/${set.name}/${name}.svg`, { responseType: 'text' })
      .pipe(share());
  }

  private getOrSetIconSet(set: string): IconSet {
    let iSet = this.iconRegister.get(set);
    if (iSet) {
      return iSet;
    }
    iSet = {
      name: set,
      icons: []
    };
    this.iconRegister.set(set, iSet);

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

}
