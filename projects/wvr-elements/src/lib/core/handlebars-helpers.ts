
/**
 * All helpers available in templating.
 * DEV NOTE: New helpers must be registered in TemplateService.
 */
export const handlebarsHelpers = {
  json: context => JSON.stringify(context)
};
