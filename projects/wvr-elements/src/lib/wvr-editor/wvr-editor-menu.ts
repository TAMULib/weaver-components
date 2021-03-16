import { WvrEditorSubMenu } from "./wvr-editor-sub-menu";

export interface WvrEditorMenu {
  file: WvrEditorSubMenu;
  edit: WvrEditorSubMenu;
  view: WvrEditorSubMenu;
  insert?: WvrEditorSubMenu;
  format?: WvrEditorSubMenu;
  tools?: WvrEditorSubMenu;
  table?: WvrEditorSubMenu;
  help?: WvrEditorSubMenu;
}
