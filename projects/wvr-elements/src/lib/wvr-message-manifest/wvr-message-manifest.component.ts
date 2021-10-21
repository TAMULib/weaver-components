import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { MessageClientOptions, MessageClientProtocol, MessageManifest, MessageManifestActions, MessageManifestEntry, MessageManifestReducers, MessageMappingStrategy } from '../core/message-manifest';
import { wvrTimeout } from '../shared/utility';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrMessageManifestEntryComponent } from './wvr-message-manifest-entry/wvr-message-manifest-entry.component';

/**
 * The WvrMessageManifestComponent is used to express a potential remote data source. To be used
 * with the `wvr-data` input.
 */
@Component({
  selector: 'wvr-message-manifest-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrMessageManifestComponent extends WvrBaseComponent {

  /** The name by which this message manifest can be referenced. */
  // tslint:disable-next-line: prefer-readonly
  @Input() name: string;

  /** A human description of this manifes. */
  // tslint:disable-next-line: prefer-readonly
  @Input() description: string;

  /** The broker URL to be prepended to all paths expressed on MessageManifestEntries. */
  // tslint:disable-next-line: prefer-readonly
  @Input() brokerUrl: string;

  /** The protocol to use. */
  @Input() protocol;

  /** Additional configuration options. */
  @Input() options;

  /** The strategy to be employed to unwrap response data. */
  // tslint:disable-next-line: prefer-readonly
  @Input() mappingStrategy;

  /** A collection of the child WvrMessageManifestEntryComponent. */
  private readonly messageManifestEntries = new Array<WvrMessageManifestEntryComponent>();

  // tslint:disable-next-line:no-empty
  constructor(injector: Injector) {
    super(injector);
  }

  addEntry(entry: WvrMessageManifestEntryComponent): void {
    this.messageManifestEntries.push(entry);

    wvrTimeout(() => {
      this.buildEntries();
    });
  }

  /**
   * Converts this message manifests WvrMessageManifestEntryComponents into MessageManifestEntries.
   */
  private buildEntries(): void {
    const ms = this.mappingStrategy ? this.mappingStrategy.toUpperCase() : 'NONE';

    const entries: Array<MessageManifestEntry> = this.messageManifestEntries.map(e => ({
      name: e.name,
      description: e.description,
      destination: e.destination,
      mappingStrategy: e.mappingStrategy ? e.mappingStrategy.toUpperCase() : ms
    }));

    const manifest: MessageManifest = {
      name: this.name,
      description: this.description,
      brokerUrl: this.brokerUrl,
      entries,
      connection: {
        status: MessageManifestReducers.ConnectionStatus.DISCONNECTED
      },
      protocol: this.protocol ? this.protocol.toUpperCase() : undefined,
      options: this.options ? JSON5.parse(this.options) : undefined
    };

    this.store.dispatch(MessageManifestActions.addManifest({
      manifest
    }));
  }

}
