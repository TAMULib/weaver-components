import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ComponentRegistryService } from '../../core/component-registry.service';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrStompManifestComponent } from '../wvr-stomp-manifest.component';

@Component({
  selector: 'wvr-stomp-manifest-entry-component',
  template: '',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrStompManifestEntryComponent implements OnInit {

  /** The name by which this stomp manifest entry can be referenced. */
  @Input() name;

  /** A human description of this manifes. */
  @Input() description;

  /** The destination to connect to. */
  @Input() destination;

  /** The protocol to use. */
  @Input() protocol;

  /** Additional configuration options. */
  @Input() options;

  /** The strategy to be employed to unwrap response data. */
  @Input() mappingStrategy;

  /** A collection of the child WvrStompManifestEntryComponent. */
  private parent: WvrStompManifestComponent;

  constructor(
    private readonly eRef: ElementRef<HTMLElement>,
    private readonly componentRegistry: ComponentRegistryService<WvrBaseComponent>
  ) {

  }

  ngOnInit(): void {
    const parentElem = this.eRef.nativeElement.closest('wvre-stomp-manifest, wvr-stomp-manifest-component');
    if (parentElem) {
      this.parent = this.componentRegistry.getComponentByElement(parentElem as HTMLElement) as WvrStompManifestComponent;
      this.parent.addEntry(this);
    } else {
      console.warn(`WvrStompManifestEntryComponent ${this.name} is not contained with a WvrStompManifestComponent`);
    }
  }

}
