FROM node:12.14-slim

COPY . /app/.

WORKDIR /app

RUN npm install
RUN npm run build

FROM httpd:2.4-alpine
COPY ./dist/weaver-components.js /usr/local/apache2/htdocs/wvr-components/