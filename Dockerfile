FROM node:12.14-slim as npm

COPY package.json ./

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

RUN ls -la

FROM httpd:2.4-alpine
COPY --from=npm /app/dist/bundle/ /usr/local/apache2/htdocs/wvr-components/
