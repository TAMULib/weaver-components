import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-editor-component',
  templateUrl: './wvr-editor.component.html',
  styleUrls: ['./wvr-editor.component.scss']
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

  @Input() menu: Object = `{
                            file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
                            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                            insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
                            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                            table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                            help: { title: 'Help', items: 'help'
                          }`;

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
