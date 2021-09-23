import { weaverInit } from '../projects/wvr-elements/src/lib/shared/utility';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

weaverInit(AppModule, environment);
