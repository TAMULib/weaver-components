const wrapper = (template) => {
  var iFrameHead = document.getElementsByTagName('head')[0];
  var wvrScript = document.createElement('script');
  wvrScript.type = 'text/javascript';
  wvrScript.src = 'weaver-components.js';
  iFrameHead.appendChild(wvrScript);
  return () => template;
}

export default wrapper;