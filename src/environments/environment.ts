import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Excluse devtools from production as per https://ngrx.io/guide/store-devtools/recipes/exclude .
export const storeDevtoolsInstrument = [
  StoreDevtoolsModule.instrument({
    maxAge: 25, // retains last 25 states
    logOnly: true // restrict extension to log-only mode
  })
];

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
