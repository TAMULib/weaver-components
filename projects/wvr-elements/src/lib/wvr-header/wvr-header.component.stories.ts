// tslint:disable-next-line:no-default-import
import wrapper from '../shared/story-wrapper';

// tslint:disable-next-line:no-default-export
export default {
  title: 'Weaver Header'
};

export const defaultHeader = wrapper(`
<wvr-header>
</wvr-header>
`);

export const customizedHeader = wrapper(`
<wvr-header header-title="This Is Awesome" primary="purple" secondary="orange">
</wvr-header>
`);

export const headerWithLinks = wrapper(`
<wvr-header>
</wvr-header>
`);
