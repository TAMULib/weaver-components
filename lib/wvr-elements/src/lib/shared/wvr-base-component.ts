import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Injector, ElementRef, Input, OnChanges } from '@angular/core';

export abstract class WvrBaseComponent {

  private readonly BLUE_COLOR: string = '--wvr-blue';
  private readonly INDIGO_COLOR: string = '--wvr-indigo';
  private readonly PURPLE_COLOR: string = '--wvr-purple';
  private readonly PINK_COLOR: string = '--wvr-pink';
  private readonly RED_COLOR: string = '--wvr-red';
  private readonly ORANGE_COLOR: string = '--wvr-orange';
  private readonly YELLOW_COLOR: string = '--wvr-yellow';
  private readonly GREEN_COLOR: string = '--wvr-green';
  private readonly TEAL_COLOR: string = '--wvr-teal';
  private readonly CYAN_COLOR: string = '--wvr-cyan';
  private readonly WHITE_COLOR: string = '--wvr-white';
  private readonly GRAY_COLOR: string = '--wvr-gray';
  private readonly GRAY_DARK_COLOR: string = '--wvr-gray-dark';
  private readonly PRIMARY_COLOR: string = '--wvr-primary';
  private readonly SECONDARY_COLOR: string = '--wvr-secondary';
  private readonly SUCCESS_COLOR: string = '--wvr-success';
  private readonly INFO_COLOR: string = '--wvr-info';
  private readonly WARNING_COLOR: string = '--wvr-warning';
  private readonly DANGER_COLOR: string = '--wvr-danger';
  private readonly LIGHT_COLOR: string = '--wvr-light';
  private readonly DARK_COLOR: string = '--wvr-dark';
  private readonly BREAKPOINT_XS: string = '--wvr-breakpoint-xs';
  private readonly BREAKPOINT_SM: string = '--wvr-breakpoint-sm';
  private readonly BREAKPOINT_MD: string = '--wvr-breakpoint-md';
  private readonly BREAKPOINT_LG: string = '--wvr-breakpoint-lg';
  private readonly BREAKPOINT_XL: string = '--wvr-breakpoint-xl';
  private readonly FONT_FAMILY_SANS_SERIF: string = '--wvr-font-family-sans-serif';
  private readonly FONT_FAMILY_MONOSPACE: string = '--wvr-font-family-monospace';

  protected elem: ElementRef;
  protected domSanitizer: DomSanitizer;
  public slotValidation: Map<string, string[]>;

  @Input()
  set blue(v: string) {
    this.elem.nativeElement.style.setProperty(this.BLUE_COLOR, v);
  }

  get blue(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BLUE_COLOR);
  }

  @Input()
  set indigo(v: string) {
    this.elem.nativeElement.style.setProperty(this.INDIGO_COLOR, v);
  }

  get indigo(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.INDIGO_COLOR);
  }

  @Input()
  set purple(v: string) {
    this.elem.nativeElement.style.setProperty(this.PURPLE_COLOR, v);
  }

  get purple(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.PURPLE_COLOR);
  }

  @Input()
  set pink(v: string) {
    this.elem.nativeElement.style.setProperty(this.PINK_COLOR, v);
  }

  get pink(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.PINK_COLOR);
  }

  @Input()
  set red(v: string) {
    this.elem.nativeElement.style.setProperty(this.RED_COLOR, v);
  }

  get red(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.RED_COLOR);
  }

  @Input()
  set orange(v: string) {
    this.elem.nativeElement.style.setProperty(this.ORANGE_COLOR, v);
  }

  get orange(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.ORANGE_COLOR);
  }

  @Input()
  set yellow(v: string) {
    this.elem.nativeElement.style.setProperty(this.YELLOW_COLOR, v);
  }

  get yellow(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.YELLOW_COLOR);
  }

  @Input()
  set green(v: string) {
    this.elem.nativeElement.style.setProperty(this.GREEN_COLOR, v);
  }

  get green(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.GREEN_COLOR);
  }

  @Input()
  set teal(v: string) {
    this.elem.nativeElement.style.setProperty(this.TEAL_COLOR, v);
  }

  get teal(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.TEAL_COLOR);
  }

  @Input()
  set cyan(v: string) {
    this.elem.nativeElement.style.setProperty(this.CYAN_COLOR, v);
  }

  get cyan(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.CYAN_COLOR);
  }

  @Input()
  set white(v: string) {
    this.elem.nativeElement.style.setProperty(this.WHITE_COLOR, v);
  }

  get white(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.WHITE_COLOR);
  }

  @Input()
  set gray(v: string) {
    this.elem.nativeElement.style.setProperty(this.GRAY_COLOR, v);
  }

  get gray(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.GRAY_COLOR);
  }

  @Input()
  set grayDark(v: string) {
    this.elem.nativeElement.style.setProperty(this.GRAY_DARK_COLOR, v);
  }

  get grayDark(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.GRAY_DARK_COLOR);
  }

  @Input()
  set primary(v: string) {
    this.elem.nativeElement.style.setProperty(this.PRIMARY_COLOR, v);
  }

  get primary(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.PRIMARY_COLOR);
  }

  @Input()
  set secondary(v: string) {
    this.elem.nativeElement.style.setProperty(this.SECONDARY_COLOR, v);
  }

  get secondary(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.SECONDARY_COLOR);
  }

  @Input()
  set success(v: string) {
    this.elem.nativeElement.style.setProperty(this.SUCCESS_COLOR, v);
  }

  get success(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.SUCCESS_COLOR);
  }

  @Input()
  set info(v: string) {
    this.elem.nativeElement.style.setProperty(this.INFO_COLOR, v);
  }

  get info(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.INFO_COLOR);
  }

  @Input()
  set warning(v: string) {
    this.elem.nativeElement.style.setProperty(this.WARNING_COLOR, v);
  }

  get warning(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.WARNING_COLOR);
  }

  @Input()
  set danger(v: string) {
    this.elem.nativeElement.style.setProperty(this.DANGER_COLOR, v);
  }

  get danger(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.DANGER_COLOR);
  }

  @Input()
  set light(v: string) {
    this.elem.nativeElement.style.setProperty(this.LIGHT_COLOR, v);
  }

  get light(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.LIGHT_COLOR);
  }

  @Input()
  set dark(v: string) {
    this.elem.nativeElement.style.setProperty(this.DARK_COLOR, v);
  }

  get dark(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.DARK_COLOR);
  }

  @Input()
  set breakpointXs(v: string) {
    this.elem.nativeElement.style.setProperty(this.BREAKPOINT_XS, v);
  }

  get breakpointXs(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BREAKPOINT_XS);
  }

  @Input()
  set breakpointSm(v: string) {
    this.elem.nativeElement.style.setProperty(this.BREAKPOINT_SM, v);
  }

  get breakpointSm(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BREAKPOINT_SM);
  }

  @Input()
  set breakpointMd(v: string) {
    this.elem.nativeElement.style.setProperty(this.BREAKPOINT_MD, v);
  }

  get breakpointMd(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BREAKPOINT_MD);
  }

  @Input()
  set breakpointLg(v: string) {
    this.elem.nativeElement.style.setProperty(this.BREAKPOINT_LG, v);
  }

  get breakpointLg(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BREAKPOINT_LG);
  }

  @Input()
  set breakpointXl(v: string) {
    this.elem.nativeElement.style.setProperty(this.BREAKPOINT_XL, v);
  }

  get breakpointXl(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.BREAKPOINT_XL);
  }

  @Input()
  set fontFamilySansSerif(v: string) {
    this.elem.nativeElement.style.setProperty(this.FONT_FAMILY_SANS_SERIF, v);
  }

  get fontFamilySansSerif(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.FONT_FAMILY_SANS_SERIF);
  }

  @Input()
  set fontFamilyMonospace(v: string) {
    this.elem.nativeElement.style.setProperty(this.FONT_FAMILY_MONOSPACE, v);
  }

  get fontFamilyMonospace(): string {
    return this.elem.nativeElement.style.getPropertyValue(this.FONT_FAMILY_MONOSPACE);
  }

  constructor(injector: Injector) {
    this.elem = injector.get(ElementRef);
    this.domSanitizer = injector.get(DomSanitizer);
    let _this = this;
  }

  safe(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  slotChange($event) {
    const assigned: HTMLElement[] = $event.target.assignedElements();
    assigned.forEach(elem => {
      this.slotValidation.forEach((validation, key) => {
        if (this[key] && validation.find(v => v === (<HTMLElement>elem).tagName)) {
          this[key].push(elem);
        }
      });
    });
  }

}