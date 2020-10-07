import { Icon } from './icon';

/** Describes a list of Icon */
export interface IconSet {

  /** The name of the icon set. **Must match the sets directory name within the assets location**. */
  name: string;
  icons: Array<Icon>;
}
