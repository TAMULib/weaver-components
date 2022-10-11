# Settings.
ARG USER_ID=3001
ARG USER_NAME=components
ARG SOURCE_DIR=/$USER_NAME/source
ARG NPM_REGISTRY=upstream
ARG NODE_ENV=development

# Node stage.
FROM node:lts-slim as build
ARG USER_ID
ARG USER_NAME
ARG SOURCE_DIR
ARG NPM_REGISTRY
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Create the user and group (use a high ID to attempt to avoid conflicts).
RUN groupadd --non-unique -g $USER_ID $USER_NAME && \
    useradd --non-unique -d /$USER_NAME -m -u $USER_ID -g $USER_ID $USER_NAME

# Update the system and install dependencies (iproute2 is needed for "ip").
RUN apt-get update && \
    apt-get upgrade -y && \
    apt install iproute2 -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy in files from outside of docker.
COPY . $SOURCE_DIR

# Ensure required file permissions.
RUN chown -R $USER_ID:$USER_ID $SOURCE_DIR

# Set deployment directory.
WORKDIR $SOURCE_DIR

# Login as user.
USER $USER_NAME

# Perform actions.
RUN echo $NPM_REGISTRY && \
    bash build/docker-npmrc.sh $NPM_REGISTRY && \
    npm install && \
    npm run build

# Apache stage.
FROM httpd:2.4-alpine
ARG SOURCE_DIR
ARG MAJOR_VERSION=0x
ARG MAJOR_MINOR_VERSION=0.0

COPY --from=build $SOURCE_DIR/dist/bundle/ /usr/local/apache2/htdocs/wvr-components/bundle
COPY --from=build $SOURCE_DIR/src/config-template.json tmp/config-template.json

RUN ln -s /usr/local/apache2/htdocs/wvr-components/bundle /usr/local/apache2/htdocs/wvr-components/latest && \
    ln -s /usr/local/apache2/htdocs/wvr-components/bundle /usr/local/apache2/htdocs/wvr-components/${MAJOR_VERSION}x && \
    ln -s /usr/local/apache2/htdocs/wvr-components/bundle /usr/local/apache2/htdocs/wvr-components/${MAJOR_MINOR_VERSION}

COPY build/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

RUN apk update && \
    apk upgrade

RUN echo "" >> /usr/local/apache2/conf/httpd.conf && \
    echo "###SPECIFIC CUSTOMIZATIONS###" >> /usr/local/apache2/conf/httpd.conf && \
    echo "" >> /usr/local/apache2/conf/httpd.conf && \
    printf '<Directory /usr/local/apache2/htdocs> \nOrder Allow,Deny \nAllow from all \nAllowOverride all \nHeader set Access-Control-Allow-Origin "*" \n</Directory>' >> /usr/local/apache2/conf/httpd.conf

CMD ["httpd", "-D", "FOREGROUND"]
