import { Component, Injector, Input, OnInit } from '@angular/core';
import { WvrBaseComponent } from '../shared/wvr-base.component';

@Component({
  selector: 'wvr-editor-component',
  templateUrl: './wvr-editor.component.html',
  styleUrls: ['./wvr-editor.component.scss']
})
export class WvrEditorComponent extends WvrBaseComponent implements OnInit {

  @Input() initValue = "";
  // initValue = "{
  //   height: 500,
  //   menubar: false,
  //   plugins: [
  //     'advlist autolink lists link image charmap print',
  //     'preview anchor searchreplace visualblocks code',
  //     'fullscreen insertdatetime media table paste',
  //     'help wordcount'
  //   ],
  //   toolbar:
  //     'undo redo | formatselect | bold italic | \
  //     alignleft aligncenter alignright alignjustify | \
  //     bullist numlist outdent indent | help'
  // }";

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
