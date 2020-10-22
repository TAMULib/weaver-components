import { Template } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, Injector, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-card-component',
  templateUrl: './wvr-card.component.html',
  styleUrls: ['./wvr-card.component.scss']
})
export class WvrCardComponent extends WvrBaseComponent implements AfterViewInit, OnInit {

  cardHeader: string;

  @ViewChildren('cardHeaderContent') cardHeaderTemplate: TemplateRef<any>;

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
    console.log(this.cardHeaderTemplate);
    if (wvrCardHeaderElem) {
      const headerText = wvrCardHeaderElem.innerHTML;
      wvrCardHeaderElem.outerHTML = headerText;
      this.cardHeader = 'true';
      console.log(this.cardHeader, typeof this.cardHeader);
    }
  }

  private renderCardFooter(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardFooterElem = elem.querySelector('wvre-card-footer');
    if (wvrCardFooterElem) {
      this.footerTextMuted = wvrCardFooterElem.hasAttribute('text-muted');
      const footerText = wvrCardFooterElem.innerHTML;
      wvrCardFooterElem.outerHTML = footerText;
    }
  }

  private renderCardImg(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardImgElem = elem.querySelector('wvre-card-img');
    if (wvrCardImgElem) {
      const imgSrc = wvrCardImgElem.getAttribute('src');
      wvrCardImgElem.outerHTML = `<img alt="Card Image Cap" class="card-img-top" src="${imgSrc}" />`;
    }
  }

  private renderCardTitle(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardTitleElem = elem.querySelector('wvre-card-title');
    if (wvrCardTitleElem) {
      const titleText = wvrCardTitleElem.innerHTML;
      wvrCardTitleElem.outerHTML = `${titleText}`;
    }
  }

  private renderCardLinks(): void {
    const elem = this._eRef.nativeElement as HTMLElement;
    const wvrCardLinksElem = elem.querySelectorAll('wvre-card-link');
    wvrCardLinksElem.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkText = link.innerHTML;
      link.outerHTML = `<a href="${linkHref}" class="card-link">${linkText}</a>`;
    });
  }

}
