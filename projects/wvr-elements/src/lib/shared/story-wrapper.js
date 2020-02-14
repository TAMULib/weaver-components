const wrapper = (params, templateFn) => {
  const iFrameHead = document.getElementsByTagName('head')[0];
  const wvrScript = document.createElement('script');
  wvrScript.type = 'text/javascript';
  wvrScript.src = 'weaver-components.js';
  iFrameHead.appendChild(wvrScript);
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
