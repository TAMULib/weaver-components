import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { Manifest } from '../core/manifest/manifest';
import { ManifestEntry } from '../core/manifest/manifest-entry';
import * as ManifestActions from '../core/manifest/manifest.actions';
import { RequestMethod } from '../core/rest/request-method';
import { wvrTimeout } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as mappingStrategies from './mapping-strategies';
import { WvrManifestEntryComponent } from './wvr-manifest-entry/wvr-manifest-entry.component';

/**
 * The WvrManifestComponent is used to express a potential remote data source. To be used
 * with the `wvr-data` input.
 */
@Component({
  selector: 'wvr-manifest-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrManifestComponent extends WvrBaseComponent {

  /** The name by which this manifest can be referenced */
  // tslint:disable-next-line: prefer-readonly
  @Input() name: string;

  /** The base URL to be prepended to all paths expressed on ManifestEntries */
  // tslint:disable-next-line: prefer-readonly
  @Input() baseUrl: string;

  /** A human description of this manifes */
  // tslint:disable-next-line: prefer-readonly
  @Input() description: string;

  /** The strategy to be employed to unwrao response data */
  // tslint:disable-next-line: prefer-readonly
  @Input() mappingStrategy;

  /** A collection of the child WvrManifestEntryComponent */
  private readonly manifestEntries = new Array<WvrManifestEntryComponent>();

  // tslint:disable-next-line:no-empty
  constructor(injector: Injector) {
    super(injector);
  }

  addEntry(manifestEntry: WvrManifestEntryComponent): void {
    this.manifestEntries.push(manifestEntry);
    wvrTimeout(() => {
      this.buildEntries();
    });
  }

  /**
   * Converts this manifests WvrManifestEntryComponents into ManifestEntries
   */
  private buildEntries(): void {

    const ms = mappingStrategies[this.mappingStrategy] ?
      mappingStrategies[this.mappingStrategy] :
      mappingStrategies.none;

    const entries: Array<ManifestEntry> = this.manifestEntries.map(e => {
      const ems = mappingStrategies[e.mappingStrategy] ?
        mappingStrategies[e.mappingStrategy] :
        ms;

      return {
        name: e.name,
        methods: e.methods ? e.methods
          .split(',') as Array<RequestMethod> : [],
        path: e.path,
        description: e.description,
        options: e.options ? JSON5.parse(e.options) : {},
        map: ms.map
      };
    });

    const manifest: Manifest = {
      name: this.name,
      description: this.description,
      baseUrl: this.baseUrl,
      entries,
      authorization: undefined
    };

    this.store.dispatch(ManifestActions.addManifest({
      manifest
    }));

  }

}
