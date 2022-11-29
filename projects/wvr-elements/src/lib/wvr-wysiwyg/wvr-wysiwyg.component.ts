import { ChangeDetectionStrategy, Component, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select } from '@ngrx/store';
import { EditorComponent } from '@tinymce/tinymce-angular';
import * as JSON5 from 'json5';
import { filter, map } from 'rxjs/operators';
import tinymce from 'tinymce';
import { selectWysiwygById } from '../core/store';
import * as WysiwygActions from '../core/wysiwyg/wysiwyg.actions';
import { WvrBaseComponent } from '../shared/wvr-base.component';
import * as wvrEditor from './wvr-wysiwyg.json';

@Component({
  selector: 'wvr-wysiwyg-component',
  templateUrl: './wvr-wysiwyg.component.html',
  styleUrls: ['./wvr-wysiwyg.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WvrWysiwygComponent extends WvrBaseComponent implements OnInit, OnDestroy {

  content: string;

  @ViewChild(EditorComponent) editor;

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

  @Input() set menu(editorMenu: any) { this.config.menu = JSON5.parse(editorMenu); }
  get menu(): any { return this.config.menu; }

  @Input() emitSaveEvent: string;

  @Input() set height(height: string) { this.config.height = height; }
  get height(): string { return this.config.height; }

  config = {
    base_url: 'tinymce',
    skin: 'oxide',
    plugins: [
      "advlist", "autolink", "lists", "link", "image", "charmap",
      "preview", "anchor", "searchreplace", "visualblocks", "code",
      "fullscreen", "insertdatetime", "media", "table",
      "help", "wordcount", "preview", "save"
    ],
    toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table pagebreak | charmap codesample image | removeformat | help | cancel save',
    menu: (wvrEditor as any).default,
    height: '300',
    /* TODO: Issue #316. */
    save_oncancelcallback: $event => {
      this.onReset($event);
    },
    save_onsavecallback: $event => {
      this.onSave($event);
    },
    promotion: false
  };

  htmlId = `wvr-wysiwyg-${this.id}`;

  constructor(injector: Injector) {
    super(injector);
    this.config.base_url = `${this.appConfig.assetsUrl}/tinymce`;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(WysiwygActions.addWysiwyg({
      wysiwyg: {
        id: `${this.id}`,
        initialContent: `${this.initialValue}`,
        content: this.initialValue
      }
    }));

    this.subscriptions.push(this.store
      .pipe(
        select(selectWysiwygById(`${this.id}`)),
        filter(wysiwyg => !!wysiwyg),
        map(wysiwyg => wysiwyg.content)
      )
      .subscribe((content: string) => {
        this.content = content;
      }));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (!!this.editor) {
      tinymce.remove(this.editor);
    }
  }

  onReset($event): void {
    this.store.dispatch(WysiwygActions.resetWysiwyg({
      id: `${this.id}`
    }));
  }

  onSave($event): void {
    this.store.dispatch(WysiwygActions.saveWysiwyg({
      content: this.content,
      id: `${this.id}`
    }));
    if (this.emitSaveEvent) {
      this.eRef.nativeElement.dispatchEvent(new CustomEvent(this.emitSaveEvent, {
        bubbles: true,
        detail: {
          data: this.content,
          wysiwyg: this
        }
      }));
    }
  }

}
