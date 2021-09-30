import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { StompClientOptions, StompClientProtocol, StompManifest, StompManifestActions, StompManifestEntry, StompManifestReducers, StompMappingStrategy } from '../core/stomp-manifest';
import { wvrTimeout } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrStompManifestEntryComponent } from './wvr-stomp-manifest-entry/wvr-stomp-manifest-entry.component';

/**
 * The WvrStompManifestComponent is used to express a potential remote data source. To be used
 * with the `wvr-data` input.
 */
@Component({
  selector: 'wvr-stomp-manifest-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrStompManifestComponent extends WvrBaseComponent {

  /** The name by which this stomp manifest can be referenced. */
  // tslint:disable-next-line: prefer-readonly
  @Input() name: string;

  /** A human description of this manifes. */
  // tslint:disable-next-line: prefer-readonly
  @Input() description: string;

  /** The broker URL to be prepended to all paths expressed on StompManifestEntries. */
  // tslint:disable-next-line: prefer-readonly
  @Input() brokerUrl: string;

  /** The protocol to use. */
  @Input() protocol;

  /** Additional configuration options. */
  @Input() options;

  /** The strategy to be employed to unwrap response data. */
  // tslint:disable-next-line: prefer-readonly
  @Input() mappingStrategy;

  /** A collection of the child WvrStompManifestEntryComponent. */
  private readonly stompManifestEntries = new Array<WvrStompManifestEntryComponent>();

  // tslint:disable-next-line:no-empty
  constructor(injector: Injector) {
    super(injector);
  }

  addEntry(entry: WvrStompManifestEntryComponent): void {
    this.stompManifestEntries.push(entry);

    wvrTimeout(() => {
      this.buildEntries();
    });
  }

  /**
   * Converts this stomp manifests WvrStompManifestEntryComponents into StompManifestEntries.
   */
  private buildEntries(): void {
    const ms = this.mappingStrategy ? this.mappingStrategy.toUpperCase() : 'NONE';

    const entries: Array<StompManifestEntry> = this.stompManifestEntries.map(e => ({
      name: e.name,
      description: e.description,
      destination: e.destination,
      mappingStrategy: e.mappingStrategy ? e.mappingStrategy.toUpperCase() : ms
    }));

    const manifest: StompManifest = {
      name: this.name,
      description: this.description,
      brokerUrl: this.brokerUrl,
      entries,
      connection: {
        status: StompManifestReducers.ConnectionStatus.DISCONNECTED
      },
      protocol: this.protocol ? this.protocol.toUpperCase() : undefined,
      options: this.options ? JSON5.parse(this.options) : undefined
    };

    this.store.dispatch(StompManifestActions.addManifest({
      manifest
    }));
  }

}
