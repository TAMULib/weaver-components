# Changelog

## [1.9.0] - 03-31-21
### Resolves

- Weaver Components should provide a modal component. (#314)
- Weaver Components should offer a WYSIWYG component. (#315)
- Weaver Button should be able to trigger actions on a parent component. (#319)
- Weaver WYSIWYG should maintain state using NgRX (#322)

## [1.8.0] - 12-18-20
### Resolves

- Weaver Components should utilize externals to reduce bundle size. (#158)
- Remove scss, rendered unnecessary by the recent theme features. (#276)

## [1.7.4] - 12-15-20
### Resolves

- Patch icon bug

## [1.7.3] - 12-15-20
### Resolves

- Fixed SVG styling and performance.

## [1.7.2] - 12-14-20
### Resolves

- Performance improvements

## [1.7.1] - 11-20-20
### Resolves

- Fixes bootstrapping process.

## [1.7.0] - 11-20-20
### Resolves

- Wvr animations have regressed and are no longer firing. (#256)
- SetTimeouts are not performant at load time. (#257)
- Weaver Usage Documentation should include the component template in tab list. (#260)
- Wvr Components should support an extensible list of branded colors. (Primary, secondary, danger, warning... etc). (#262)
- Refactor color usage across wvr components to use branded color list, and include fallback support. (#263)
- Color preview component. (#264)

## [1.6.0] - 11-2-20
### Resolves

- Weaver component's build process should build multiple versions of the product. (#86)
- Weaver Usage Docs should be converted into an angular project. (#102)
- The wvr manifest action to submit request should afford providing response map. (#223)
- Handlebars should be extracted into a service and all helpers declared outside of the component constructor. (#232)
- On safari (check firefox) mobile display does not run the position footer function at load time. (#233)
- Weaver components should provide a wvr-cards component. (#234)
- Weaver Component selectors need to be refactored to avoid name collision with Weaver (angularjs) directives. (#237)
- The wvr-header should use the configured asset path for the header logo. (#255)

## [1.5.0] - 10-8-20
### Resolves

- Weaver Components should communicate with Weaver web services. (#195)
- Weaver Lists should automatically assign aria owns attribute for each of its list items. (#206)
- Weaver Components should provide an Alert Component. (#207)
- Weaver Components should dynamically assign unique identifiers to each component. (#208)
- Explore ngRX as a state store solution for components. (#209)
- Weaver Components should offer a tabs component. (#210)

## [1.4.0] - 9-23-20
### Resolves

- Encapsulates bootstrap within global styling
- Performance improvements 
- Introduces Mobile Service
- The list item context attr should override the visual context of the list item. (#199)

## [1.3.0] - 08-13-20
### Resolves

- Weaver Components should have an element query strategy. (#27)
- Icons should be integrated into weaver buttons. (#128)
- Weaver Components should support lists with expanding and collapsing sections. (#163)
- The Wvr Icon component should support animation. (#164)
- Weaver Components should have a list component. (#165)
- Coveralls not providing the coverage notification. (#167)
- Observable subscriptions should be unsubscribed from or converted to promises. (#168)

## [1.2.0] - 07-16-20
### Resolves

- Weaver Component should support a global configuration paradigm. (#64)
- Weaver Components should share vendor styling across components. (#82)
- Weaver Components should support multiple font icon libraries. (#85)
- Buttons must be integrated into weaver drop-down. (#129)
- Weaver footer "stick-to-bottom" property affected by wvr-button line-height and padding property. (#150)

## [1.1.0] - 06-25-20
### Resolves

- Wvr Components should provide a wvr-button component (#103)
- CDN needs to be exposed through the firewall (#135)
- Fix Z-Index on dropdown overlaps (#133)
- Restore dynamic change detection for display of bottom nav (#136)
- Dropdown inside of List inside of Header flickers instead of staying open (#119)

## [1.0.0] - 06-11-20
### Resolves

- The wvr-header should support mobile and tablet layouts (#7)
- Weaver Components should have CI hooks for lighthouse (#105)
- wvr-component should have attribute: page-title-url (#116)
- Weaver Drop down component selector should be renamed (#125)

## [0.0.5] - 05-14-2020
### Resolves

- The wvr-header should support accessible designs (#8)
- Weaver Components should provide a drop down element (#20)
- The wvr-header component's bottom-nav section should display conditionally (#81)
- Weaver components usage documentation fails to build (#83)
- Weaver documentation landing page is broken (#84)
- wvr-footer's navbar should be have a height of 100% (#89)
