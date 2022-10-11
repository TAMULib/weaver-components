import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { WvrAlertComponent } from '../wvr-alert/wvr-alert.component';
import { WvrButtonComponent } from '../wvr-button/wvr-button.component';
import { WvrCardComponent } from '../wvr-card/wvr-card.component';
import { WvrColorPreviewComponent } from '../wvr-color-preview/wvr-color-preview.component';
import { WvrDropdownComponent } from '../wvr-dropdown/wvr-dropdown.component';
import { WvrFooterComponent } from '../wvr-footer/wvr-footer.component';
import { WvrHeaderComponent } from '../wvr-header/wvr-header.component';
import { WvrIconComponent } from '../wvr-icon/wvr-icon.component';
import { WvrItWorksComponent } from '../wvr-it-works/wvr-it-works.component';
import { WvrListItemComponent } from '../wvr-list/wvr-list-item/wvr-list-item.component';
import { WvrListComponent } from '../wvr-list/wvr-list.component';
import { WvrManifestEntryComponent } from '../wvr-manifest/wvr-manifest-entry/wvr-manifest-entry.component';
import { WvrManifestComponent } from '../wvr-manifest/wvr-manifest.component';
import { WvrMessageManifestEntryComponent } from '../wvr-message-manifest/wvr-message-manifest-entry/wvr-message-manifest-entry.component';
import { WvrMessageManifestComponent } from '../wvr-message-manifest/wvr-message-manifest.component';
import { WvrModalComponent } from '../wvr-modal/wvr-modal.component';
import { WvrNavLiComponent } from '../wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from '../wvr-nav-list/wvr-nav-list.component';
import { WvrTabsComponent } from '../wvr-tabs/wvr-tabs.component';
import { WvrTextComponent } from '../wvr-text/wvr-text.component';
import { WvrThemeComponent } from '../wvr-theme/wvr-theme.component';
import { WvrWysiwygComponent } from '../wvr-wysiwyg/wvr-wysiwyg.component';
import { WvrContentProjectionDirective } from './directives/wvr-content-projection.directive';
import { DefaultPipe } from './pipes/default.pipe';
import { SafePipe } from './pipes/safe.pipe';

/** This property contains a list of components classes. */
export const WVR_COMPONENTS = [
  WvrAlertComponent,
  WvrButtonComponent,
  WvrCardComponent,
  WvrColorPreviewComponent,
  WvrContentProjectionDirective,
  WvrDropdownComponent,
  WvrFooterComponent,
  WvrHeaderComponent,
  WvrIconComponent,
  WvrItWorksComponent,
  WvrListComponent,
  WvrListItemComponent,
  WvrManifestComponent,
  WvrManifestEntryComponent,
  WvrMessageManifestComponent,
  WvrMessageManifestEntryComponent,
  WvrModalComponent,
  WvrNavLiComponent,
  WvrNavListComponent,
  WvrTabsComponent,
  WvrTextComponent,
  WvrThemeComponent,
  WvrWysiwygComponent
];

export const WVR_PIPES = [
  SafePipe,
  DefaultPipe
];

const MODULES = [
  CommonModule,
  EditorModule,
  FormsModule,
  NgbDropdownModule,
  NgbModalModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...WVR_COMPONENTS,
    ...WVR_PIPES
  ],
  declarations: [
    ...WVR_COMPONENTS,
    ...WVR_PIPES
  ],
  providers: [],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WvrSharedModule {

}
