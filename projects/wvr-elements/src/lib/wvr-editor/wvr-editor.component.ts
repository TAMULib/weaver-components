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

  private _menu: WvrEditorMenu = (wvrEditor as any).default;

  htmlId = `wvr-editor-${this.id}`;

  @Input() initialValue = '';

  @Input() baseUrl = '/tinymce';

  @Input() skin = 'oxide-dark';

  @Input() disabled: 'true' | 'false' = 'false';

  @Input() plugins = [
    'advlist autolink lists link image charmap print',
    'preview anchor searchreplace visualblocks code',
    'fullscreen insertdatetime media table paste',
    'help wordcount print preview'
  ];

  @Input() outputFormat: "html" | "text" = "text";

  @Input() referrerPolicy = 'strict-origin-when-cross-origin';

  @Input() set menu(editorMenu: any) {
    this._menu = JSON5.parse(editorMenu) as WvrEditorMenu;
  }

  get menu(): any {
    return this._menu;
  }

  /* Allows enabling both vertical and horizontal resize. */
  @Input() resize: 'true' | 'false' | 'both' = 'both';

  constructor(injector: Injector) {
    super(injector);
  }

}
