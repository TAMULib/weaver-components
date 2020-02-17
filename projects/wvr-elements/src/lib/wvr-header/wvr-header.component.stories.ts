// tslint:disable-next-line:no-default-import
import { array, color, text, withKnobs } from '@storybook/addon-knobs';
import wrapper from '../shared/story-wrapper';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Header',
  decorators: [withKnobs]
};

export const defaultHeader = wrapper({
  componentSubtitle: 'Displays a header at the top of the document'
}, () => {
  const template = `
<wvr-header>
</wvr-header>
`;

  return template;
});

export const customizedHeader = wrapper({}, () => {
  const logoSrc = text('Logo Source', 'assets/weaver-w.svg', 'General');
  const logoText = text('Logo Text', 'Logo Text', 'General');
  const logoHref = text('Logo HREF', '#relative-url', 'General');
  const title = text('Header Title', 'Page Title', 'General');

  const topLinks = array('Top Links', [], '|', 'General');
  const bottomLinks = array('Bottom Links', [], '|', 'General');

  const primary = color('Primary Color', 'var()', 'Theme');
  const secondary = color('Secondary Color', 'var()', 'Theme');
  const gray = color('Gray Color', 'var()', 'Theme');
  const template = `
<wvr-header logo-src="${logoSrc}" logo-text="${logoText}" logo-href="${logoHref}" header-title="${title}" primary="${primary}" secondary="${secondary}" gray="${gray}">
  <wvr-nav-list top-navigation aligned="RIGHT">
  ${topLinks.map(l =>
    `<wvr-nav-li href="#${l}">
      <wvr-text value="${l}"></wvr-text>
    </wvr-nav-li>`
  )}
  </wvr-nav-list>
  <wvr-nav-list bottom-navigation>
  ${bottomLinks.map(l =>
    `<wvr-nav-li href="#${l}">
      <wvr-text value="${l}"></wvr-text>
    </wvr-nav-li>`
  )}
  </wvr-nav-list>
</wvr-header>
`;

  return template;
});

export const headerWithLinks = wrapper({}, () => `
<wvr-header>
  <wvr-nav-list top-navigation aligned="RIGHT">
    <wvr-nav-li href="#about-us">
      <wvr-text value="About"></wvr-text>
    </wvr-nav-li>
    <wvr-nav-li href="#hours">
      <wvr-text value="Hours"></wvr-text>
    </wvr-nav-li>
    <wvr-nav-li href="#contact">
      <wvr-text value="Contact"></wvr-text>
    </wvr-nav-li>
  </wvr-nav-list>
  <wvr-nav-list bottom-navigation>
    <wvr-nav-li href="#1">
      <wvr-text value="Link 1"></wvr-text>
    </wvr-nav-li>
    <wvr-nav-li href="#2">
      <wvr-text value="Link 2"></wvr-text>
    </wvr-nav-li>
    <wvr-nav-li href="#3">
      <wvr-text value="Link 3"></wvr-text>
    </wvr-nav-li>
  </wvr-nav-list>
</wvr-header>
`);
