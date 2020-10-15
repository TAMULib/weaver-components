#!/bin/sh

set -e

# copy new bundles to volume
yes | cp -rf /bundle/* /usr/local/apache2/htdocs/wvr-components

# iterate over all config templates and create new configs from environment variables
for template in `find /usr/local/apache2/htdocs/wvr-components -name config-template.json`; do
  config=${template/config-template.json/config.json};
  echo $(eval echo $(echo $(cat $template) | sed -r "s/\\\"/\\\\\"/g")) > $config
  printf "$config\n$(cat $config)\n"
done

exec "$@"
