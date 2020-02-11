// tslint:disable-next-line:no-default-import
import wrapper from '../shared/story-wrapper';
import { text, withKnobs } from '@storybook/addon-knobs';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Header',
  decorators: [withKnobs]
};

export const defaultHeader = wrapper(() => `
<wvr-header>
</wvr-header>
`);

export const customizedHeader = wrapper(() => {
  const title = text('Header Title', 'John Doe');
  const primary = text('Primary Color', 'blue');
  const secondary = text('Secondary Color', 'gray');
  const template = `
<wvr-header header-title="${title}" primary="${primary}" secondary="${secondary}">
</wvr-header>
  `;

  return template;
});

export const headerWithLinks = wrapper(() => `
<wvr-header>
</wvr-header>
`);
