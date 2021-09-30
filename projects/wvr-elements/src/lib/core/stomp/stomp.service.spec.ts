import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ActivationState, Client, IFrame, IMessage, StompHeaders } from '@stomp/stompjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WvrBaseComponent } from '../../shared/wvr-base.component';
import { WvrItWorksComponent } from '../../wvr-it-works/wvr-it-works.component';
import { APP_CONFIG, testAppConfig } from '../../shared/config';
import { metaReducers, ROOT_REDUCER } from '../store';
import { StompService } from './stomp.service';
import { StompManifest, StompManifestReducers } from '../stomp-manifest';

describe('StompService', () => {
  let service: StompService;
  let component: WvrItWorksComponent;
  let fixture: ComponentFixture<WvrItWorksComponent>;
  let manifest: StompManifest;

  let mockClient = jasmine.createSpyObj('Client', [ 'activate', 'configure', 'deactivate', 'subscribe', 'unsubscribe' ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, StoreModule.forRoot(ROOT_REDUCER, { metaReducers }) ],
      declarations: [ WvrItWorksComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: testAppConfig },
        { provide: Client, useValue: mockClient }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(StompService);
    fixture = TestBed.createComponent(WvrItWorksComponent);
    component = fixture.componentInstance;

    manifest = {
      name: 'Directory App STOMP',
      brokerUrl: 'https://api-dev.library.tamu.edu/mylibrary/connect',
      mappingStrategy: 'WEAVER',
      protocol: 'WEB_SOCKET',
      entries: [ ],
      connection: {
        status: StompManifestReducers.ConnectionStatus.DISCONNECTED
      }
    };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

});
