import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { select } from '@ngrx/store';
import * as JSON5 from 'json5';
import { filter } from 'rxjs/operators';
import { Editor } from 'tinymce';
import { selectWysiwygById } from '../core/store';
import * as WysiwygActions from '../core/wysiwyg/wysiwyg.actions';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrWysiwygMenu } from './wvr-wysiwyg-menu';
import * as wvrEditor from './wvr-wysiwyg.json';

@Component({
  selector: 'wvr-wysiwyg-component',
  templateUrl: './wvr-wysiwyg.component.html',
  styleUrls: ['./wvr-wysiwyg.component.scss']
})
export class WvrWysiwygComponent extends WvrBaseComponent implements OnInit {

  @ViewChild('editor') editor: Editor;

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
    save_oncancelcallback: $event => this.onCancel($event),
    save_onsavecallback: $event => this.onSave($event)
  };

  htmlId = `wvr-wysiwyg-${this.id}`;

  constructor(injector: Injector) {
    super(injector);
    this.config.base_url = `${this.appConfig.assetsUrl}/tinymce`;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(WysiwygActions.addWysiwyg({ wysiwyg: {
      id: `${this.id}`,
      initialContent: `${this.initialValue}`,
      content: this.initialValue
    }}));
    this.store.pipe(
      select(selectWysiwygById(`${this.id}`)) //,
      // filter(wysiwygState => !!wysiwygState)
    )
    .subscribe(wysiwygState => {
      // const wysiwygContent = wysiwygState.entities[`${this.id}`].content;
      console.log('wysiwygState', wysiwygState);
      // this.editor.setContent(wysiwygContent);
    });
  }

  onCancel($event): void {
    console.log('cancel', $event);
    this.store.dispatch(WysiwygActions.resetWysiwyg({
      id: `${this.id}`
    }));
  }

  onSave($event): void {
    // console.log('save', $event);
    const editorContent = $event.contentDocument.body.innerText;
    this.store.dispatch(WysiwygActions.saveWysiwyg({
      content: editorContent,
      id: `${this.id}`
    }));
  }

}
