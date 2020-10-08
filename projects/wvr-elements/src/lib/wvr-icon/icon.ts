import { Observable } from 'rxjs';

/** Describes an observable of string to be resolved as an icon svg. */
export interface Icon {

  /** The name of the given icon. **Must match filename**. */
  name: string;

  /** An observable which resolves a string representation of the icon's SVG. */
  svg: Observable<string>;
}
