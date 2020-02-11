// tslint:disable-next-line:no-default-import
import wrapper from '../shared/story-wrapper';
import { withKnobs } from '@storybook/addon-knobs';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Nav List',
  decorators: [withKnobs]
};

export const defaultNavList = wrapper({
  componentSubtitle: 'Displays a bootstrap nav-list'
}, () => `
<wvr-nav-list>
  <wvr-nav-li>
    <wvr-text value="Action"></wvr-text>
  </wvr-nav-li>
  <wvr-nav-li href="#link">
    <wvr-text value="Link"></wvr-text>
  </wvr-nav-li>
  <wvr-nav-li>
    <wvr-text value="Action"></wvr-text>
  </wvr-nav-li>
</wvr-nav-list>
`);
