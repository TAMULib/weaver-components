#!/bin/sh

set -e

config=/usr/local/apache2/htdocs/wvr-components/bundle/config.json
template=tmp/config-template.json

echo $(eval echo $(echo $(cat $template) | sed -r "s/\\\"/\\\\\"/g")) > $config

echo "Done docker-entrypoint..."

exec "$@"
