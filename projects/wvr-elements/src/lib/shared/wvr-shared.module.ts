import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
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
import { WvrNavLiComponent } from '../wvr-nav-list/wvr-nav-li/wvr-nav-li.component';
import { WvrNavListComponent } from '../wvr-nav-list/wvr-nav-list.component';
import { WvrTabComponent } from '../wvr-tabs/wvr-tab/wvr-tab.component';
import { WvrTabsComponent } from '../wvr-tabs/wvr-tabs.component';
import { WvrTextComponent } from '../wvr-text/wvr-text.component';
import { WvrThemeComponent } from '../wvr-theme/wvr-theme.component';
import { DefaultPipe } from './pipes/default.pipe';
import { SafePipe } from './pipes/safe.pipe';

/** This property contains a list of components classes. */
export const WVR_COMPONENTS = [
  WvrAlertComponent,
  WvrButtonComponent,
  WvrCardComponent,
  WvrColorPreviewComponent,
  WvrDropdownComponent,
  WvrFooterComponent,
  WvrHeaderComponent,
  WvrIconComponent,
  WvrListComponent,
  WvrListItemComponent,
  WvrItWorksComponent,
  WvrNavListComponent,
  WvrNavLiComponent,
  WvrTextComponent,
  WvrManifestComponent,
  WvrManifestEntryComponent,
  WvrTabsComponent,
  WvrTabComponent,
  WvrThemeComponent
];

export const WVR_PIPES = [
  SafePipe,
  DefaultPipe
];

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbDropdownModule
  ],
  exports: [
    CommonModule,
    InlineSVGModule,
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
