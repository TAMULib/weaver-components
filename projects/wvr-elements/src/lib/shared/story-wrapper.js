import copyCodeBlock from '@pickra/copy-code-block';
import hljs from 'highlight.js/lib/highlight';

const options = {
  lang: 'xml',
  cssOverrides: `
  .container {
    margin-top: 2rem;
  }

  .container code {
    padding: 0.5rem 2rem;
  }
  .copyButton:hover {
    cursor: pointer;
    color: #222;
    background-color: #ededed;
  }
`,
  colors: {
    buttonBackground: '#a4a4a5',
    buttonTextColor: '#222',
    background: '#F6F9FC',
    textColor: '#fff',
    attr: '#46adac',
    string: '#a4a4a5',
    tag: '#ff4785',
    name: '#1EA7FD'
  }
};

const wrapper = (templateFn) => {
  var iFrameHead = document.getElementsByTagName('head')[0];
  var wvrScript = document.createElement('script');
  wvrScript.type = 'text/javascript';
  wvrScript.src = 'weaver-components.js';
  iFrameHead.appendChild(wvrScript);
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
  const wrappedStory = templateFn;
  wrappedStory.story = {
    parameters: {
      storySource: {
        source: templateFn()
      }
    }
  };
  return wrappedStory;
};

export default wrapper;
