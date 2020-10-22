import { Template } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-card-component',
  templateUrl: './wvr-card.component.html',
  styleUrls: ['./wvr-card.component.scss']
})
export class WvrCardComponent extends WvrBaseComponent implements AfterViewInit, OnInit {

  hasCardHeader: boolean;
  hasCardImg: boolean;
  hasCardTitle: boolean;
  hasCardListTop: boolean;
  hasCardBody: boolean;
  hasCardListBottom: boolean;
  hasCardLinkBody: boolean;
  hasCardButton: boolean;
  hasCardFooter: boolean;

  @ViewChild('cardHeaderContent') cardHeaderTemplate: ElementRef<any>;

  /** The weaver card text center attribute */
  cardTextCenter: boolean;

  /** The weaver card footer text muted attribute */
  footerTextMuted: boolean;

  /**
   * The weaver card component constructor
   */
  constructor(injector: Injector) {
    super(injector);
  }

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

  private renderCard(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardElem = elem.querySelector('.wvr-card');
    if (wvrCardElem.parentElement.hasAttribute('text-center')) {
        wvrCardElem.classList.add('text-center');
    }
  }

  private renderCardHeader(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardHeaderElem = elem.querySelector('wvre-card-header');
    if (wvrCardHeaderElem) {
      const headerText = wvrCardHeaderElem.innerHTML;
      wvrCardHeaderElem.outerHTML = headerText;
      this.hasCardHeader = true;
    }
  }

  private renderCardFooter(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardFooterElem = elem.querySelector('wvre-card-footer');
    if (wvrCardFooterElem) {
      this.footerTextMuted = wvrCardFooterElem.hasAttribute('text-muted');
      const footerText = wvrCardFooterElem.innerHTML;
      wvrCardFooterElem.outerHTML = footerText;
      this.hasCardFooter = true;
    }
  }

  private renderCardImg(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardImgElem = elem.querySelector('wvre-card-img');
    if (wvrCardImgElem) {
      const imgSrc = wvrCardImgElem.getAttribute('src');
      wvrCardImgElem.outerHTML = `<img alt="Card Image Cap" class="card-img-top" src="${imgSrc}" />`;
      this.hasCardImg = true;
    }
  }

  private renderCardTitle(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardTitleElem = elem.querySelector('wvre-card-title');
    if (wvrCardTitleElem) {
      const titleText = wvrCardTitleElem.innerHTML;
      wvrCardTitleElem.outerHTML = `${titleText}`;
      this.hasCardTitle = true;
    }
  }

  private renderCardLinks(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardLinksElem = elem.querySelectorAll('wvre-card-link');
    wvrCardLinksElem.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkText = link.innerHTML;
      link.outerHTML = `<a href="${linkHref}" class="card-link">${linkText}</a>`;
      this.hasCardLinkBody = true;
    });
  }

  private renderCardLists(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardListsTop = elem.querySelectorAll('wvre-list[top]');
    const wvrCardListsBottom = elem.querySelectorAll('wvre-list[bottom]');
    if (wvrCardListsTop.length) {
      this.hasCardListTop = true;
    }
    if (wvrCardListsBottom.length) {
      this.hasCardListBottom = true;
    }
  }

  private renderCardButtons(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardButton = elem.querySelectorAll('wvre-button');
    if (wvrCardButton.length) {
      this.hasCardButton = true;
    }
  }

}
