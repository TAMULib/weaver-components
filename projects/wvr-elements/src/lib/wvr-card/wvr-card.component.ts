import { AfterViewInit, Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

/**
 * A component wrapper for the bootstrap card element.
 */
@Component({
  selector: 'wvr-card-component',
  templateUrl: './wvr-card.component.html',
  styleUrls: ['./wvr-card.component.scss']
})
export class WvrCardComponent extends WvrBaseComponent implements AfterViewInit {

  /** Indicates the presence of the card header in the projected content. */
  hasCardHeader: boolean;

  /** Indicates the presence of the card img in the projected content. */
  hasCardImg: boolean;

  /** Indicates the presence of the card tile in the projected content. */
  hasCardTitle: boolean;

  /** Indicates the presence of the card list top in the projected content. */
  hasCardListTop: boolean;

  /** Indicates the presence of the card list bottom in the projected content. */
  hasCardListBottom: boolean;

  /** Indicates the presence of the card links in the projected content. */
  hasCardLinkBody: boolean;

  /** Indicates the presence of the card buttons in the projected content. */
  hasCardButton: boolean;

  /** Indicates the presence of the card footer in the projected content. */
  hasCardFooter: boolean;

  /** The weaver card text center attribute */
  cardTextCenter: boolean;

  /** The weaver card footer text muted attribute */
  footerTextMuted: boolean;

  /** Allows for the override of the default 'wvre' sufix for psudo components. */
  @Input() selectorPrefix = 'wvre';

  /** Toggles the centering of header and footer texts. */
  @Input() textCenter;

  /** Used to describe the type of card. */
  @Input() cardType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  /** Used to describe the format of card. */
  @Input() panelFormat: 'solid' | 'outlined' | 'mixed';

  /** Element reference to the root html elment in the template. */
  @ViewChild('animationRoot') rootElem: ElementRef<HTMLElement>;

  /** Convenience referece this components ElementReference's nativeElement. */
  private readonly elem: HTMLElement;

  /**
   * The weaver card component constructor
   */
  constructor(injector: Injector) {
    super(injector);
    this.elem = this._eRef.nativeElement as HTMLElement;
  }

  /** Called after the view has been intialized. Handles the rendering of the projected content. */
  ngAfterViewInit(): void {
    this.renderCard();
    this.renderCardHeader();
    this.renderCardImg();
    this.renderCardTitle();
    this.renderCardLinks();
    this.renderCardLists();
    this.renderCardButtons();
    this.renderCardFooter();
  }

  isOutLined(cardType: string): boolean {
    return this.cardType === cardType &&
            ((!this.panelFormat || this.panelFormat === 'mixed') ||
             this.panelFormat === 'outlined');
  }

  isSolid(cardType: string): boolean {
    return this.cardType === cardType && this.panelFormat === 'solid';
  }

  isMixed(cardType: string): boolean {
    return this.cardType === cardType && (!this.panelFormat || this.panelFormat === 'mixed');
  }

  /** Prepares the card for display */
  private renderCard(): void {
    if (this.textCenter !== undefined && this.textCenter !== 'false') {
        const wvrCardElem: HTMLElement = this.rootElem.nativeElement;
        wvrCardElem.classList.add('text-center');
    }
  }

  /** Prepares the card header for display, and sets it to the DOM */
  private renderCardHeader(): void {
    const wvrCardHeaderElem = this.elem.querySelector(`${this.selectorPrefix}-card-header`);

    if (wvrCardHeaderElem) {
      const classList: DOMTokenList  = wvrCardHeaderElem.classList;
      const headerText = wvrCardHeaderElem.innerHTML;
      wvrCardHeaderElem.outerHTML = headerText;
      // tslint:disable-next-line: no-unbound-method
      classList.forEach(c => wvrCardHeaderElem.classList
        .add);
      this.hasCardHeader = true;
    }
  }

  /** Prepares the card footer for display, and sets it to the DOM */
  private renderCardFooter(): void {
    const wvrCardFooterElem = this.elem.querySelector(`${this.selectorPrefix}-card-footer`);
    if (wvrCardFooterElem) {
      this.footerTextMuted = wvrCardFooterElem.hasAttribute('text-muted');
      const footerText = wvrCardFooterElem.innerHTML;
      wvrCardFooterElem.outerHTML = footerText;
      this.hasCardFooter = true;
    }
  }

  /** Prepares the card image for display, and sets it to the DOM */
  private renderCardImg(): void {
    const wvrCardImgElem = this.elem.querySelector(`${this.selectorPrefix}-card-img`);
    if (wvrCardImgElem) {
      const imgSrc = wvrCardImgElem.getAttribute('src');
      wvrCardImgElem.outerHTML = `<img alt="Card Image Cap" class="card-img-top" src="${imgSrc}" />`;
      this.hasCardImg = true;
    }
  }

  /** Prepares the card title for display, and sets it to the DOM */
  private renderCardTitle(): void {
    const wvrCardTitleElem = this.elem.querySelector(`${this.selectorPrefix}-card-title`);
    if (wvrCardTitleElem) {
      const titleText = wvrCardTitleElem.innerHTML;
      wvrCardTitleElem.outerHTML = `${titleText}`;
      this.hasCardTitle = true;
    }
  }

  /** Prepares the card links for display, and sets it to the DOM */
  private renderCardLinks(): void {
    const wvrCardLinksElem = this.elem.querySelectorAll(`${this.selectorPrefix}-card-link`);
    wvrCardLinksElem.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkText = link.innerHTML;
      link.outerHTML = `<a href="${linkHref}" class="card-link">${linkText}</a>`;
      this.hasCardLinkBody = true;
    });
  }

  /** Prepares the card list for display, and sets it to the DOM */
  private renderCardLists(): void {
    const wvrCardListsTop = this.elem.querySelectorAll(`wvre-list[top], ${this.selectorPrefix}-list[top]`);
    const wvrCardListsBottom = this.elem.querySelectorAll(`wvre-list[bottom], ${this.selectorPrefix}-list[bottom]`);
    if (wvrCardListsTop.length) {
      this.hasCardListTop = true;
    }
    if (wvrCardListsBottom.length) {
      this.hasCardListBottom = true;
    }
  }

  /** Prepares the card buttons for display, and sets it to the DOM */
  private renderCardButtons(): void {
    const wvrCardButton = this.elem.querySelectorAll(`${this.selectorPrefix}-button`);
    if (wvrCardButton.length) {
      this.hasCardButton = true;
    }
  }

}
