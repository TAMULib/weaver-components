FROM node:12.14-slim as builder

COPY package.json ./

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM httpd:2.4-alpine
COPY --from=builder /app/dist/weaver-components.js /usr/local/apache2/htdocs/wvr-components/ 
