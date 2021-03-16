import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import tinymce from 'tinymce';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import { WvrEditorMenu } from './wvr-editor-menu';
import { WvrEditorSubMenu } from './wvr-editor-sub-menu';
import * as WvrEditor from './wvr-editor.json';
import * as JSON5 from 'json5';

@Component({
  selector: 'wvr-editor-component',
  templateUrl: './wvr-editor.component.html',
  styleUrls: ['./wvr-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WvrEditorComponent extends WvrBaseComponent {

  htmlId = `wvr-editor-${this.id}`;

  @Input() apiKey = 'no-api-key';

  @Input() cloudChannel = '5-stable';

  @Input() skinUrl =  `${this.appConfig.assetsUrl}/skins/ui/oxide-dark`;

  @Input() initialValue = '';

  @Input() disabled: 'true' | 'false' = 'false';

  @Input() menuBar = 'file edit view insert format table tools help';

  @Input() editorPlugings = ['advlist autolink lists link image charmap print',
                            'preview anchor searchreplace visualblocks code',
                            'fullscreen insertdatetime media table paste',
                            'help wordcount print preview spellchecker'
                          ];

  @Input() outputFormat: "html"|"text" = "text";

  @Input() referrerPolicy = 'strict-origin-when-cross-origin';

  @Input() toolBar = ['undo redo | formatselect | bold italic underline code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help | print preview | media spellchecker' ];

  private _menu: WvrEditorMenu;

  @Input() set menu(editorMenu: string) {
    this._menu = JSON5.parse(editorMenu) as WvrEditorMenu;
    console.log(this._menu);
  }

  @Input() mobileMenu: Object = `{
                                  menubar: true,
                                  plugins: [ 'autosave', 'lists', 'autolink' ],
                                  toolbar: [ 'undo', 'bold', 'italic', 'styleselect' ]
                                }`;

  /* Allows enabling both vertical and horizontal resize. */
  @Input() resize: 'true' | 'false' | 'both' = 'both';

  constructor(injector: Injector) {
    super(injector);
  }

}
