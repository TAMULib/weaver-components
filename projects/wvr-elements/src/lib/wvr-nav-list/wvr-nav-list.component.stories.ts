// tslint:disable-next-line:no-default-import
import wrapper from '../../../../../scripts/story-wrapper';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import { Alignment } from '../shared/alignment.enum';

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

export const customNavList = wrapper({
  componentSubtitle: 'Displays a bootstrap nav-list with customizations'
}, () => {

  const options = Object.values(Alignment);
  const aligned = select('Set Alignment', options, options[0]);
  const isVertical = boolean('Set Vertical', false);

  return `
<wvr-nav-list aligned="${aligned}" vertical="${isVertical}">
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
`;

});
