const wrapper = (params, templateFn) => {
  const iFrameHead = document.getElementsByTagName('head')[0];
  const scripts = iFrameHead.querySelectorAll('script[src="weaver-components.js"]');
  if (scripts.length === 0) {
    const wvrScript = document.createElement('script');
    wvrScript.setAttribute('defer', 'defer');
    wvrScript.setAttribute('src', 'weaver-components.js');
    iFrameHead.appendChild(wvrScript);
  }
  const wrappedStory = () => templateFn();
  const parameters = Object.assign({
    storySource: {
      source: templateFn ? templateFn() : ''
    }
  }, params);
  wrappedStory.story = {
    parameters
  };
  return wrappedStory;
};

export default wrapper;
