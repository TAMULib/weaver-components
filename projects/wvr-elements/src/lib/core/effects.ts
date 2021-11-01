import { ManifestEffects as Manifest } from './manifest/manifest.effects';
import { MessageManifestEffects as MessageManifest } from './message-manifest/message-manifest.effects';
import { ModalEffects as Modal } from './modal/modal.effects';
import { RestEffects as Rest } from './rest/rest.effects';
import { ThemeEffects as Theme } from './theme/theme.effects';
import { WysiwygEffects as Wysiwyg } from './wysiwyg/wysiwyg.effects';

export const effects = {
  Manifest,
  MessageManifest,
  Modal,
  Rest,
  Theme,
  Wysiwyg
};
