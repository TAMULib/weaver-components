FROM node:12.14-slim as npm

COPY package.json ./

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM httpd:2.4-alpine

ENV BASE_URL=http://localhost:4200
ENV ASSETS_URL=http://localhost:4200/assets

VOLUME /usr/local/apache2/htdocs/wvr-components

COPY --from=npm /app/dist/bundle/ /bundle

COPY docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

RUN apk update;
RUN apk upgrade;

RUN printf '<Directory /usr/local/apache2/htdocs> \nOrder Allow,Deny \nAllow from all \nAllowOverride all \nHeader set Access-Control-Allow-Origin "*" \n</Directory>' >> /usr/local/apache2/conf/httpd.conf

CMD ["httpd", "-D", "FOREGROUND"]

EXPOSE 80
