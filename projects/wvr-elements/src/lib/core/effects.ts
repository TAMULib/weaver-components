import { ManifestEffects as Manifest } from './manifest/manifest.effects';
import { ModalEffects as Modal } from './modal/modal.effects';
import { RestEffects as Rest } from './rest/rest.effects';
import { StompManifestEffects as StompManifest } from './stomp-manifest/stomp-manifest.effects';
import { ThemeEffects as Theme } from './theme/theme.effects';
import { WysiwygEffects as Wysiwyg } from './wysiwyg/wysiwyg.effects';

export const effects = {
  Manifest,
  Modal,
  Rest,
  StompManifest,
  Theme,
  Wysiwyg
};
