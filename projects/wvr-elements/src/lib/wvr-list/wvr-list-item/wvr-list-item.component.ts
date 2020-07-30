import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'wvr-list-item-element',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent implements AfterViewInit {

  private readonly parent: HTMLElement;

  listType: string;

  @Input() description: string;

  @Input() context: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  @Input() customContentItemHeading: string;

  @Input() cusomContentHeadingSmallText: string;

  @Input() customContentSmallText: string;

  constructor(private readonly ref: ElementRef, private readonly cdRef: ChangeDetectorRef) {
    this.parent = (ref.nativeElement as HTMLElement).closest('wvr-list');

    const listTypeAttribute = this.parent ? this.parent.getAttribute('list-type') : undefined ;
    this.listType = listTypeAttribute ? listTypeAttribute : 'unordered';

    const contextAttribute = this.parent ?
      (this.parent.getAttribute('context') as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark')
      : undefined ;
    this.context = contextAttribute ? contextAttribute : undefined;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

}
