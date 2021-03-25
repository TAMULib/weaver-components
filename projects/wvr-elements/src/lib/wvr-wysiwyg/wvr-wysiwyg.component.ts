import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { Wysiwyg } from '../core/wysiwyg/wysiwyg';
import * as wvrEditor from './wvr-wysiwyg.json';
import { WvrWysiwygMenu } from './wvr-wysiwyg-menu';
import * as WysiwygActions from '../core/wysiwyg/wysiwyg.actions';
import { Store } from '@ngrx/store';
import { RootState } from '../core/store';


@Component({
  selector: 'wvr-wysiwyg-component',
  templateUrl: './wvr-wysiwyg.component.html',
  styleUrls: ['./wvr-wysiwyg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WvrWysiwygComponent extends WvrBaseComponent { // implements OnInit

  @Input() initialValue: string;

  @Input() outputFormat: 'text' | 'html' = 'html';

  @Input() set baseUrl(baseUrl: string) { this.config.base_url = baseUrl; }
  get baseUrl(): string { return this.config.base_url; }

  @Input() set skin(skin: string) { this.config.skin = skin; }
  get skin(): string { return this.config.skin; }

  @Input() set plugins(plugins: Array<string>) { this.config.plugins = plugins; }
  get plugins(): Array<string> { return this.config.plugins; }

  @Input() set toolbar(toolbar: string) { this.config.toolbar = toolbar; }
  get toolbar(): string { return this.config.toolbar; }

  @Input() set menu(editorMenu: any) { this.config.menu = JSON5.parse(editorMenu) as WvrWysiwygMenu; }
  get menu(): any { return this.config.menu; }

  config = {
    base_url: 'tinymce',
    skin: 'oxide',
    plugins: [
      'advlist autolink lists link image charmap print',
      'preview anchor searchreplace visualblocks code',
      'fullscreen insertdatetime media table paste',
      'help wordcount print preview save'
    ],
    toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table pagebreak | charmap codesample image | removeformat | help | cancel save',
    menu: (wvrEditor as any).default,
    /* TODO: Issue #316. */
    save_oncancelcallback: this.onCancel,
    save_onsavecallback: this.onSave
  };

  htmlId = `wvr-wysiwyg-${this.id}`;

  private editorElement: HTMLElement;

  constructor(injector: Injector, store: Store<RootState> ) {
    super(injector);

    this.config.base_url = `${this.appConfig.assetsUrl}/tinymce`;
  }

  // ngOnInit(): void {
  //   super.ngOnInit();
  //   console.log('HERE');
  // }

  /* TODO: Issue #316. */
  onChange($event): void {
    const iFrameElem = (this.eRef.nativeElement as HTMLElement).querySelector('iframe');
    // console.log(iFrameElem.contentDocument.body.innerHTML);
  }

  onCancel($event): void {
    console.log('cancel', $event);
    // console.log(this.initialValue);
  }

  onSave($event): void {
    console.log('save', $event);
    const editorContent = $event.contentDocument.body.innerHTML;
    // this.store.dispatch(WysiwygActions.saveWysiwyg({
    //   // data: editorContent
    // }
    // ));
  }

}
