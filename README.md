[![Build Status](https://travis-ci.org/TAMULib/weaver-components.svg?branch=master)](https://travis-ci.org/TAMULib/weaver-components) 
[![Coverage Status](https://coveralls.io/repos/github/TAMULib/weaver-components/badge.svg?branch=master)](https://coveralls.io/github/TAMULib/weaver-components?branch=master) [![Compodoc Coverage](https://tamulib.github.io/weaver-components/docs/development/images/coverage-badge-documentation.svg)](https://tamulib.github.io/weaver-components/docs/development/coverage.html)

# Lighthouse Badges

[![Performance](https://tamulib.github.io/weaver-components/reports/audit/assets/performance.svg)](https://tamulib.github.io/weaver-components/reports/audit/#performance)
[![Accessibility](https://tamulib.github.io/weaver-components/reports/audit/assets/accessibility.svg)](https://tamulib.github.io/weaver-components/reports/audit/#accessibility)
[![Best Practices](https://tamulib.github.io/weaver-components/reports/audit/assets/best-practices.svg)](https://tamulib.github.io/weaver-components/reports/audit/#best-practices)
[![SEO](https://tamulib.github.io/weaver-components/reports/audit/assets/seo.svg)](https://tamulib.github.io/weaver-components/reports/audit/#seo)
[![Progressive Web App](https://tamulib.github.io/weaver-components/reports/audit/assets/pwa.svg)](https://tamulib.github.io/weaver-components/reports/audit/#pwa)

# WeaverComponents

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

[Documentation](https://tamulib.github.io/weaver-components/docs).

[Reports](https://tamulib.github.io/weaver-components/reports).

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker deployment

```
docker volume create serve
docker build -t weaver-components .
docker run -p 8080:80 -v serve:/usr/local/apache2/htdocs/wvr-components weaver-components

docker system prune -a -f
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
You can also use `npm run build:clean|wvr-elements|wvr-components`.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
You can also use `npm run test:unit|watch`.

## Running end-to-end tests

Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
