// tslint:disable-next-line:no-default-import
import { array, color, text, withKnobs } from '@storybook/addon-knobs';
// tslint:disable-next-line:no-default-import
import wrapper from '../shared/story-wrapper';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Footer',
  decorators: [withKnobs]
};

export const defaultFooter = wrapper({
  componentSubtitle: 'Displays a footer at the top of the document'
}, () => {
  const template = `
<wvr-footer>
</wvr-footer>
`;

  return template;
});

export const customizedFooter = wrapper({}, () => {
  const links = array('Footer Links', ['Link 1', 'Link 2', 'Link 3'], '|', 'General');
  const backgroundColor = color('Background Color', 'var()', 'Theme');
  const template = `
<wvr-footer background="${backgroundColor}">
  <wvr-nav-list aligned="CENTER">
  ${links.map(l => `
    <wvr-nav-li href="#${l}">
      <wvr-text value="${l}"></wvr-text>
    </wvr-nav-li>
  `)}
  </wvr-nav-list>
</wvr-footer>
`;

  return template;
});
