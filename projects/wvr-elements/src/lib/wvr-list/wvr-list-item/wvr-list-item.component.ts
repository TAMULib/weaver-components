import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

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

  // displayActiveState: boolean = false

  constructor(private readonly ref: ElementRef, private readonly cdRef: ChangeDetectorRef , private readonly renderer: Renderer2) {
    this.parent = (ref.nativeElement as HTMLElement).closest('wvr-list');

    const listTypeAttribute = this.parent ? this.parent.getAttribute('list-type') : undefined ;
    this.listType = listTypeAttribute ? listTypeAttribute : 'ul';

    const contextAttribute = this.parent ?
      (this.parent.getAttribute('context') as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark')
      : undefined ;
    this.context = contextAttribute ? contextAttribute : undefined;
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  /**
   * A handler method for the `click` event for a list group item.
   */
  @HostListener('document:click', ['$event']) onClick($event): void {
    $event.preventDefault();
    const listGroupItemElement = (this.ref.nativeElement as HTMLElement).querySelector('.list-group-item');
    if (this.ref.nativeElement.contains($event.target)) {
      this.renderer.addClass(listGroupItemElement, 'active');
    } else {
      this.renderer.removeClass(listGroupItemElement, 'active');
    }
  }

}
