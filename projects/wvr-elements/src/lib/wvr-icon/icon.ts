import { Observable } from 'rxjs';

export interface Icon {
  name: string;
  svg: Observable<string>;
}
