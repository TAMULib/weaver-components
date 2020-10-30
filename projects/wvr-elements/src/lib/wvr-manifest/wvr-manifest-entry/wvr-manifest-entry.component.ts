import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ComponentRegistryService } from '../../core/component-registry.service';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrManifestComponent } from '../wvr-manifest.component';

@Component({
  selector: 'wvr-manifest-entry-component',
  template: ''
})
export class WvrManifestEntryComponent implements OnInit {

  @Input() name;

  @Input() description;

  @Input() methods;

  @Input() path;

  @Input() options;

  @Input() mappingStrategy;

  private parent: WvrManifestComponent;

  // tslint:disable-next-line:no-empty
  constructor(private readonly eRef: ElementRef<HTMLElement>, 
              private readonly componentRegistry: ComponentRegistryService<WvrBaseComponent>) {}

  ngOnInit(): void {
    const parentElem = this.eRef.nativeElement.closest('wvre-manifest, wvr-manifest-component');
    if (parentElem) {
      this.parent = this.componentRegistry.getComponentByElement(parentElem as HTMLElement) as WvrManifestComponent;
      this.parent.addEntry(this);
    } else {
      console.warn(`WvrManifestEntryComponent ${this.name} is not contained with a WvrManifestComponent`);
    }
  }

}
