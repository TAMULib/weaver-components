import { Observable } from 'rxjs';

export interface WvrDataComponent {
  data: {[as: string]: Observable<any>};
  hasWvrData(): boolean;
  getWvrData(): string;
}
