import { WvrwysiwygSubMenu } from './wvr-wysiwyg-sub-menu';

export interface WvrWysiwygMenu {
  file: WvrwysiwygSubMenu;
  edit: WvrwysiwygSubMenu;
  view: WvrwysiwygSubMenu;
  insert?: WvrwysiwygSubMenu;
  format?: WvrwysiwygSubMenu;
  tools?: WvrwysiwygSubMenu;
  table?: WvrwysiwygSubMenu;
  help?: WvrwysiwygSubMenu;
}
