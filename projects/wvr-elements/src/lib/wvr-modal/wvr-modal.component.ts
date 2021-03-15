import { AfterViewInit, Component, ElementRef, Injector, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as ModalActions from '../core/modal/modal.actions';
import { selectModalState } from '../core/store';
import { ThemeVariantName } from '../shared/theme';
import { WvrBaseComponent } from '../shared/wvr-base.component';


@Component({
  selector: 'wvr-modal-content-component',
  template: '<div #anchorElement></div>'
})
export class WvrModalContentComponent implements AfterViewInit {
  @Input() modalTemplate;
  @ViewChild('anchorElement', {read: ViewContainerRef}) anchor: ViewContainerRef;

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    
  }

  renderContent() {
    this.anchor.createEmbeddedView(this.modalTemplate);
  }
}

@Component({
  selector: 'wvr-modal-component',
  templateUrl: './wvr-modal.component.html',
  styleUrls: ['./wvr-modal.component.scss']
})
export class WvrModalComponent extends WvrBaseComponent implements OnInit {

  @ViewChild('modalContent') modalContent: ElementRef<HTMLElement>;

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

  modalRef: NgbModalRef;

  @Input() name;

  modalId: string;

  @Input() themeVariant: ThemeVariantName;
  @Input() modalHeaderThemeVariant: ThemeVariantName;
  @Input() modalFooterThemeVariant: ThemeVariantName;

  modalShown: Observable<boolean>;

  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const defaultName = 'Weaver Modal';
    this.modalId = !this.name ? `${defaultName
      .split(' ')
      .join('')}-${this.id}` : this.name;

    this.name = !this.name ? defaultName : this.name;

    this.store.dispatch(ModalActions.addModal({modal: {
      name: this.modalId,
      open: false
    }}));

    this.store.pipe(
      select(selectModalState),
      filter(modalState => !!modalState)
    )
    .subscribe(modalState => {
      const modal = modalState.entities[this.modalId];
      if (modal.open) {

        this.modalRef =  this.modalService.open(this.modalTemplate, {
          ariaLabelledBy: 'modal-basic-title',
          container: this.eRef.nativeElement,
          beforeDismiss: () => {
            this.store.dispatch(ModalActions.closeModal({id: this.modalId}));

            return false;
          }
        });

        const modelContentContainer = (this.eRef.nativeElement as HTMLElement).querySelector('modal-content');
        modelContentContainer.outerHTML = this.modalContent.nativeElement.innerHTML;
        this.modalContent.nativeElement.innerHTML = '';

      } else if (this.modalRef) {

        const modelContentContainer = (this.eRef.nativeElement as HTMLElement).querySelector('.modal-content');
        this.modalContent.nativeElement.innerHTML = modelContentContainer.innerHTML;

        this.modalRef.close();
       }
    });
  }

  openModal(): void {
    this.store.dispatch(ModalActions.openModal({id: this.modalId}));
  }

  additionalClasses(value): string {
    let additionalClasses = '';
    switch (value) {
      case 'header':
        additionalClasses = this.modalHeaderThemeVariant ?
                            ` bg-${this.modalHeaderThemeVariant} border-${this.modalHeaderThemeVariant} ${this.getTextColor(this.modalHeaderThemeVariant)}` :
                            this.themeVariant ?
                            ` bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
                            ' bg-light text-dark ';
        break;
      case 'footer':
        additionalClasses = this.modalFooterThemeVariant ?
                            ` bg-${this.modalFooterThemeVariant} border-${this.modalFooterThemeVariant} ${this.getTextColor(this.modalFooterThemeVariant)}` :
                            this.themeVariant ?
                            ` bg-${this.themeVariant} border-${this.themeVariant} ${this.getTextColor(this.themeVariant)}` :
                            ' bg-light text-dark ';
        break;
      default:
    }

    return additionalClasses;
  }

  getTextColor(themeVariant): string {
    return ((themeVariant === 'warning') || (themeVariant === 'light')) ? ' text-dark ' : ' text-white ';
  }

}
