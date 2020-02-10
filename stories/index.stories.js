import wrapper from './wvr-wrapper';

export default {
  title: 'Weaver Header',
};

export const defaultHeader = wrapper(
  `<wvr-header>
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
  </wvr-header>`
);

export const awesomeHeader = wrapper(
  `<wvr-header header-title="This Is Awesome" primary="purple" secondary="orange">
    <wvr-nav-list top-navigation aligned="RIGHT" blue="cyan">
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
  </wvr-header>`
);
