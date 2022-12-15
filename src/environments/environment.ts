// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const url = 'http://192.168.1.24:8000/api/v1/';
const url = 'http://192.168.0.123:8000/api/v1/';

const userBaseUrl = url + 'user/';
const farmBaseUrl = url + 'farm/';
const plantCycleUrl = url + 'plant-cycle/';
const cropBaseUrl = farmBaseUrl + 'crop/';
const farmCropBaseUrl = farmBaseUrl + 'farm-crop/';
const geoCoderUrl = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=';
// const geoCoderUrl = 'http://139.180.192.124:8080/';
export const environment = {
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA',
  },
  production: false,

  ///////////////** USER URLS **///////////////////
  listUsers: userBaseUrl,
  getUser: userBaseUrl,
  updateUser: userBaseUrl,

  loginUser: userBaseUrl + 'login/',
  registerUser: userBaseUrl + 'register/',
  logOutUser: userBaseUrl + 'logout/',
  tokenRefresh: userBaseUrl + 'token/refresh/',

  passwordChange: userBaseUrl + 'password/change/',
  passwordReset: userBaseUrl + 'password/reset/',

  getUserProfile: userBaseUrl + 'profile/',
  updateUserProfile: userBaseUrl + 'profile/',


  ///////////////** FARM URLS **///////////////////
  listFarms: farmBaseUrl,
  createFarm: farmBaseUrl,
  getFarm: farmBaseUrl,
  updateFarm: farmBaseUrl,

  ///////////////** CROP URLS **///////////////////
  listCrop: cropBaseUrl,
  createCrop: cropBaseUrl,
  getCrop: cropBaseUrl,
  updateCrop: cropBaseUrl,

  ///////////////** FARM CROP URLS **///////////////////
  listFarmCrop: farmCropBaseUrl,
  createFarmCrop: farmCropBaseUrl,
  getFarmCrop: farmCropBaseUrl,
  updateFarmCrop: farmCropBaseUrl,

  ///////////////** PLANT CYCLE URLS **///////////////////
  createPlantCycle: plantCycleUrl,
  listPlantCycle: plantCycleUrl + '?limit=100',


  // Get location
  userLocation: geoCoderUrl

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.