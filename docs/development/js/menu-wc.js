'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">weaver-components documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/WvrCoreModule.html" data-type="entity-link" >WvrCoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WvrCoreModule-f9c8cb6d6d58b21e3071e37a6535fc7ba4537fbdf74bf7d3b785152748e15e1ab2c208c00d135960c24e405ebdb61af86553e5316f8dd8be77ae4afe52e42bb3"' : 'data-target="#xs-injectables-links-module-WvrCoreModule-f9c8cb6d6d58b21e3071e37a6535fc7ba4537fbdf74bf7d3b785152748e15e1ab2c208c00d135960c24e405ebdb61af86553e5316f8dd8be77ae4afe52e42bb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WvrCoreModule-f9c8cb6d6d58b21e3071e37a6535fc7ba4537fbdf74bf7d3b785152748e15e1ab2c208c00d135960c24e405ebdb61af86553e5316f8dd8be77ae4afe52e42bb3"' :
                                        'id="xs-injectables-links-module-WvrCoreModule-f9c8cb6d6d58b21e3071e37a6535fc7ba4537fbdf74bf7d3b785152748e15e1ab2c208c00d135960c24e405ebdb61af86553e5316f8dd8be77ae4afe52e42bb3"' }>
                                        <li class="link">
                                            <a href="injectables/ActionRegistryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionRegistryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnimationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ComponentRegistryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComponentRegistryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NgBindingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NgBindingsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ThemeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WvrSharedModule.html" data-type="entity-link" >WvrSharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' : 'data-target="#xs-components-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' :
                                            'id="xs-components-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                            <li class="link">
                                                <a href="components/WvrAlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrAlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrColorPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrColorPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrIconComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrItWorksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrItWorksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrListItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrListItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrManifestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrManifestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrManifestEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrManifestEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrMessageManifestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrMessageManifestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrMessageManifestEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrMessageManifestEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrNavLiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrNavLiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrNavListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrNavListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrTabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrTabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrThemeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrThemeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WvrWysiwygComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrWysiwygComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' : 'data-target="#xs-directives-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' :
                                        'id="xs-directives-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                        <li class="link">
                                            <a href="directives/WvrContentProjectionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WvrContentProjectionDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' : 'data-target="#xs-pipes-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' :
                                            'id="xs-pipes-links-module-WvrSharedModule-3cdb415baada935e67864daed623670382a6b3708a0bdecdeb952c0426213a6ddc67944d352c175125722dd2c41dacd54917e99de77b545ecbeea17b1db0b0fb"' }>
                                            <li class="link">
                                                <a href="pipes/DefaultPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/WvrBaseComponent.html" data-type="entity-link" >WvrBaseComponent</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionRegistryService.html" data-type="entity-link" >ActionRegistryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnimationService.html" data-type="entity-link" >AnimationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComponentRegistryService.html" data-type="entity-link" >ComponentRegistryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutEffects.html" data-type="entity-link" >LayoutEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManifestEffects.html" data-type="entity-link" >ManifestEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageManifestEffects.html" data-type="entity-link" >MessageManifestEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalEffects.html" data-type="entity-link" >ModalEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgBindingsService.html" data-type="entity-link" >NgBindingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestEffects.html" data-type="entity-link" >RestEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestService.html" data-type="entity-link" >RestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeEffects.html" data-type="entity-link" >ThemeEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WysiwygEffects.html" data-type="entity-link" >WysiwygEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionAndProps.html" data-type="entity-link" >ActionAndProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Layout.html" data-type="entity-link" >Layout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Manifest.html" data-type="entity-link" >Manifest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManifestEntry.html" data-type="entity-link" >ManifestEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManifestEntryRequest.html" data-type="entity-link" >ManifestEntryRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MappingStrategy.html" data-type="entity-link" >MappingStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageClientOptions.html" data-type="entity-link" >MessageClientOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageManifest.html" data-type="entity-link" >MessageManifest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageManifestEntry.html" data-type="entity-link" >MessageManifestEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageManifestEntryMessage.html" data-type="entity-link" >MessageManifestEntryMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageManifestState.html" data-type="entity-link" >MessageManifestState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Modal.html" data-type="entity-link" >Modal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RefBindingSubject.html" data-type="entity-link" >RefBindingSubject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestOptions.html" data-type="entity-link" >RequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RootState.html" data-type="entity-link" >RootState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOptions.html" data-type="entity-link" >SelectOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-2.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-3.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-4.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-5.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeVariant.html" data-type="entity-link" >ThemeVariant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeVariants.html" data-type="entity-link" >ThemeVariants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrAnimationComponent.html" data-type="entity-link" >WvrAnimationComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrDataComponent.html" data-type="entity-link" >WvrDataComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrDataSelect.html" data-type="entity-link" >WvrDataSelect</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrElementDesc.html" data-type="entity-link" >WvrElementDesc</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrThemeableComponent.html" data-type="entity-link" >WvrThemeableComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrWysiwygMenu.html" data-type="entity-link" >WvrWysiwygMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WvrwysiwygSubMenu.html" data-type="entity-link" >WvrwysiwygSubMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wysiwyg.html" data-type="entity-link" >Wysiwyg</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});