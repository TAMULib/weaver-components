import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import * as JSON5 from 'json5';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrEditorMenu } from './wvr-editor-menu';
import * as wvrEditor from './wvr-editor.json';

@Component({
  selector: 'wvr-editor-component',
  templateUrl: './wvr-editor.component.html',
  styleUrls: ['./wvr-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WvrEditorComponent extends WvrBaseComponent {

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

  @Input() set menu(editorMenu: any) { this.config.menu = JSON5.parse(editorMenu) as WvrEditorMenu; }
  get menu(): any { return this.config.menu; }

  config = {
    base_url: '/assets/tinymce',
    skin: 'oxide',
    plugins: [
      'advlist autolink lists link image charmap print',
      'preview anchor searchreplace visualblocks code',
      'fullscreen insertdatetime media table paste',
      'help wordcount print preview save'
    ],
    toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table pagebreak | charmap codesample image | removeformat | help | cancel save',
    menu: (wvrEditor as any).default
    /* TODO: Issue #316. */
    // save_oncancelcallback: this.onCancel,
    // save_onsavecallback: this.onSave
  };

  htmlId = `wvr-editor-${this.id}`;

  constructor(injector: Injector) {
    super(injector);
  }

  /* TODO: Issue #316. */
  // onChange($event): void {
  //   console.log($event);
  //   console.log(this.initialValue);
  // }

  // onCancel($event): void {
  //   console.log('cancel', $event);
  //   console.log(this.initialValue);
  // }

  // onSave($event): void {
  //   console.log('save', $event);
  //   console.log(this.initialValue);
  // }

}
