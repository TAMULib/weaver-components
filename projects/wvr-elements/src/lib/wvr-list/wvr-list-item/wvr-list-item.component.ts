import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
// import { WvrListComponent } from '../wvr-list.component';

@Component({
  selector: 'wvr-list-item-element',
  templateUrl: './wvr-list-item.component.html',
  styleUrls: ['./wvr-list-item.component.scss']
})
export class WvrListItemComponent implements OnInit {

  private readonly parent: HTMLElement;

  private readonly listType: string;

  @Input() description: string;

  constructor(private readonly ref: ElementRef, private readonly renderer: Renderer2) {
    this.parent = (ref.nativeElement as HTMLElement).closest('wvr-list');
    const listTypeAttribute = this.parent.getAttribute('list-type');
    this.listType = listTypeAttribute ? listTypeAttribute : 'ul';
  }

  /**
   * A handler method for the `click` event for a list group item.
   */
  @HostListener('document:click', ['$event']) onClick($event): void {
    $event.preventDefault();
    const listGroupItemElement = (this.ref.nativeElement as HTMLElement).querySelector('a');
    if (this.ref.nativeElement.contains($event.target)) {
      this.renderer.addClass(listGroupItemElement, 'active');
    } else {
      this.renderer.removeClass(listGroupItemElement, 'active');
    }
  }

  ngOnInit(): void {
    console.log(this.description);
  }

}
