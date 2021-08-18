// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  //local //
  // IMGPATH: 'http://10.1.1.11:3000/',
  // APIURL: 'http://10.1.1.11:3000/api/v1',
  // BUYSELLURL: 'http://10.1.1.11:3001/api/v1',
  // CAPTCHAKEY: '6Ld15_8UAAAAAKBNrXxkUB4FdZHPH_U8wepccw3Q',
  // uploadFileSizeKyc: 1

  //live

  // APIURL: 'https://ws.bitlus.com/api/api/v1', //live
  // BUYSELLURL: 'https://ws.bitlus.com/buysell/api/v1', //live
  // IMGPATH: 'https://ws.bitlus.com/api/',
  // // CAPTCHAKEY: '6Ld15_8UAAAAAKBNrXxkUB4FdZHPH_U8wepccw3Q',
  // CAPTCHAKEY: '6LcXj8YZAAAAACc5pc49uzEeSCas4VFtkpckCVgy',

  // uploadFileSizeKyc: 10

  // //stage//
  APIURL: 'https://ws-stage.bitlus.com/api/api/v1', //live
  BUYSELLURL: 'https://ws-stage.bitlus.com/buysell/api/v1', //live
  IMGPATH: 'https://ws-stage.bitlus.com/api/',
  CAPTCHAKEY: '6Ld15_8UAAAAAKBNrXxkUB4FdZHPH_U8wepccw3Q',
  uploadFileSizeKyc: 10,
  firebase: {
    apiKey: 'AIzaSyAhSq73ZvfIP7uSZtHTddkrT-mqf-4Vezw',
    authDomain: 'bitlus-8cb97.firebaseapp.com',
    databaseURL: 'https://bitlus-8cb97.firebaseio.com',
    projectId: 'bitlus-8cb97',
    storageBucket: 'bitlus-8cb97.appspot.com',
    messagingSenderId: '192967366902',
    appId: '1:192967366902:web:ffea653b699c3494dd34d7',
    measurementId: 'G-EG91ZFH2VW'
  }
};
