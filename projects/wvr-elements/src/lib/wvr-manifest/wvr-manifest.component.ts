import { AfterContentInit, Component, Injector, Input } from '@angular/core';
import { Manifest } from '../core/manifest/manifest';
import { ManifestEntry } from '../core/manifest/manifest-entry';
import { RequestMethod } from '../core/rest/request-method';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as ManifestActions from '../core/manifest/manifest.actions';
import * as JSON5 from 'json5';
import * as mappingStrategies from './mapping-strategies';

@Component({
  selector: 'wvr-manifest-element',
  template: '<ng-content></ng-content>'
})
export class WvrManifestComponent extends WvrBaseComponent implements AfterContentInit {

  @Input() private name: string;

  @Input() private baseUrl: string;

  @Input() private description: string;

  @Input() private mappingStrategy;

  // tslint:disable-next-line:no-empty
  constructor(private injector: Injector) {
    super(injector);
   }

  ngAfterContentInit(): void {
    this.store.dispatch(ManifestActions.addManifest({
      manifest: {
        name: this.name,
        description: this.description,
        baseUrl: this.baseUrl,
        entries: this.buildEntries(),
        authorization: undefined
      }
    }));

  }

  private buildEntries(): Array<ManifestEntry> {
    const entryNodes = Array.from((this._eRef.nativeElement as HTMLElement).querySelectorAll('wvre-manifest-entry'));
    let ms = mappingStrategies[this.mappingStrategy] ?
               mappingStrategies[this.mappingStrategy] :
               mappingStrategies.none;
    const entries: Array<ManifestEntry> = entryNodes.map(e => {
      const eMS = e.getAttribute('mapping-strategy');
      ms = mappingStrategies[eMS] ?
           mappingStrategies[eMS] :
           ms;
      const me = {
        name: e.getAttribute('name'),
        methods: e.getAttribute('methods')
          .split(',') as Array<RequestMethod>,
        path: e.getAttribute('path'),
        description: e.getAttribute('path'),
        options: JSON5.parse(e.getAttribute('options')),
        map: ms.map
      };

      return me;
    });

    return entries;
  }

}
