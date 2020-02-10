import wrapper from './wvr-wrapper';

export default {
  title: 'Weaver Header',
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