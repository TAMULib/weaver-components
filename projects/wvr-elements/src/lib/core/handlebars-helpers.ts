import Handlebars from 'handlebars/dist/cjs/handlebars';

let handlebarHelpersInitialized = false;

const initializeHandlebarHelpers = (initialContext: any = {}) => {
  if (!handlebarHelpersInitialized) {
    console.log('initialize handlebars helpers');

    Handlebars.registerHelper('json', context => JSON.stringify(context, undefined, 2));

    handlebarHelpersInitialized = true;
  }
};

export {
  handlebarHelpersInitialized,
  initializeHandlebarHelpers
};
