[![Build Status](https://github.com/TAMULib/weaver-components/workflows/Build/badge.svg)](https://github.com/TAMULib/weaver-components/actions?query=workflow%3ABuild)
[![Coverage Status](https://coveralls.io/repos/github/TAMULib/weaver-components/badge.svg?branch=master)](https://coveralls.io/github/TAMULib/weaver-components?branch=master) [![Compodoc Coverage](https://tamulib.github.io/weaver-components/docs/development/images/coverage-badge-documentation.svg)](https://tamulib.github.io/weaver-components/docs/development/coverage.html)
[![Performance](https://tamulib.github.io/weaver-components/reports/audit/assets/performance.svg)](https://tamulib.github.io/weaver-components/reports/audit/#performance)
[![Accessibility](https://tamulib.github.io/weaver-components/reports/audit/assets/accessibility.svg)](https://tamulib.github.io/weaver-components/reports/audit/#accessibility)
[![Best Practices](https://tamulib.github.io/weaver-components/reports/audit/assets/best-practices.svg)](https://tamulib.github.io/weaver-components/reports/audit/#best-practices)
[![SEO](https://tamulib.github.io/weaver-components/reports/audit/assets/seo.svg)](https://tamulib.github.io/weaver-components/reports/audit/#seo)
[![Progressive Web App](https://tamulib.github.io/weaver-components/reports/audit/assets/pwa.svg)](https://tamulib.github.io/weaver-components/reports/audit/#pwa)

# Weaver Components

Weaver Components provides a collection of custom HTML elements that represent a toolkit of dynamically renderred HTML markup, CSS Styles, and effects. This toolkit may be made available to a given project either via a CDN URL, directly attached as a Javascript file and CSS file, or via a project dependency. Such elements may be dropped directly onto a page utilizing Weaver Components and they shall be immediately renderred as appropriate.

## Installation

Weaver Components may be installed by either referencing a CDN or by using [NpmJs](https://www.npmjs.com/).

### Installation via NpmJs

Using the `npm` command (from [NpmJs](https://www.npmjs.com/)), install this project as a dependency to an existing project:
```
npm install @wvr/elements
```

### Installation via CDN

The files `weaver-components.js` and `styles.css` need to be available on some server.
See the **Building** section below for details on how to build these files.

The CSS file should be added as an HTML `<link>` element to the HTML `<header>` element, such as:
```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="https://localhost/styles.css">
  </head>
</html>
```

The Javascript file should be added an HTML `<script>` element to the HTML `<bottom>` element at the very end, such as:
```
<html>
  <body>
    ...
    <script src="https://localhost/weaver-components.js"></script>
  </body>
</html>
```

## Building

To build this project use the `npm` command (from [NpmJs](https://www.npmjs.com/)).

This project can be built to run locally for development purposes be built to get the `weaver-components.js` and `styles.css` files needed to run on a CDN.
More detailed documentation about the build process may be found via the referenced links in the **Documentation** section below.

### Building the `weaver-components.js` and the `styles.css`

The `weaver-components.js` and the `styles.css` files are needed if intending to utilize this project via a CDN.

These files are built using the `build` command from within the project root directory:
```
  cd weaver-components
  npm run build
```

Once this has successfully completed the `weaver-components.js` and `styles.css` files should be located under the `dist/bundle/` sub-directory:
```
  dist/bundle/styles.css
  dist/bundle/weaver-components.js
```

### Building for a NpmJs Package

Building this for a NpmJs Package is the same as building this for a CDN.

These files are built using the `build` command from within the project root directory:
```
  cd weaver-components
  npm run build
```

Once notable difference is that for those who want to develop against changes to this project, the `publish:npm-local` can be used as well.
This process requires starting a [Verdaccio](https://verdaccio.org/) service, of which is provided by the `start:npm-local` command.
For further details, visit the links referenced in the detailed documentation below.

## Documentation

Detailed [documentation](https://tamulib.github.io/weaver-components/docs) may be found:
- [Usage Documentation](https://tamulib.github.io/weaver-components/docs/usage)
- [Development Documentation](https://tamulib.github.io/weaver-components/docs/development/index.html)
- [Wiki](https://github.com/TAMULib/weaver-components/wiki)

Detailed [reports](https://tamulib.github.io/weaver-components/reports) may be found:
- [Audit](https://tamulib.github.io/weaver-components/reports/audit/index.html)
- [Coverage](https://tamulib.github.io/weaver-components/reports/coverage/wvr-elements/index.html)
