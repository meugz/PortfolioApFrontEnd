// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'portfolioap-bf382',
    appId: '1:179266343133:web:f6a411eaca0f8c92b10b34',
    storageBucket: 'portfolioap-bf382.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyDPoQyTASAlUwMwNHkMIckDdxambdX47Zg',
    authDomain: 'portfolioap-bf382.firebaseapp.com',
    messagingSenderId: '179266343133',
  },
  production: false,
  //basePath: 'https://mez-app-ap.onrender.com/api/',
  basePath: 'http://localhost:8080/api/',
  imgBasePath: "../../../assets/img/",
  fireImgPath: "https://firebasestorage.googleapis.com/v0/b/portfolioap-bf382.appspot.com/o/",
  mediaToken: "?alt=media&token=191386ee-97fa-4b04-87a4-66c10b48afef"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
