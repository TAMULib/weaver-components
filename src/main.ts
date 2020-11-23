import { enableProdMode, isDevMode } from '@angular/core';
import { weaverBootstrap } from '../projects/wvr-elements/src/lib/shared/utility';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  weaverBootstrap(AppModule)(isDevMode() ? '/config.json' : undefined)
    .catch();
});
