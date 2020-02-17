// tslint:disable-next-line:no-default-import
import { text, withKnobs } from '@storybook/addon-knobs';
import wrapper from '../shared/story-wrapper';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Text',
  decorators: [withKnobs]
};

export const defaultNavList = wrapper({
  componentSubtitle: 'Displays a text node'
}, () => {
  const textValue = text('Text Value', 'Hello World!');

  return `
<wvr-text value="${textValue}"></wvr-text>
`;
});
