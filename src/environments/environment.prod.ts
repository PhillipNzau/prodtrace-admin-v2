// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const url = 'http://192.168.1.24:8000/api/v1/';
const url = 'https://mobile.prodtrace.io:4443/api/v1/';

const userBaseUrl = url + 'user/';
const farmBaseUrl = url + 'farm/';
const plantCycleUrl = url + 'plant-cycle/';
const chatBaseUrl = url + 'chat/';

const cropBaseUrl = farmBaseUrl + 'crop/';
const farmCropBaseUrl = farmBaseUrl + 'farm-crop/';
const geoCoderUrl =
  'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=';
// const geoCoderUrl = 'http://139.180.192.124:8080/';
export const environment = {
  mapbox: {
    accessToken:
      'pk.eyJ1IjoicGhpbGxpcDc4IiwiYSI6ImNsZGJsYzQxcDAxcHMzb3E1NW80Nzg5YWoifQ.4_d9rNJlocMnH6klTZaa9Q',
  },
  production: true,

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
  listPlantCycleQuery: plantCycleUrl + 'qr-code?',

  ///////////////** CHAT URLS **///////////////////
  listChats: chatBaseUrl,
  createChat: chatBaseUrl,
  getChat: chatBaseUrl,
  updateChat: chatBaseUrl,
  unRepliedChats: chatBaseUrl + 'un-replied/',
  unReadResponse: chatBaseUrl + 'unread-responce/',

  // Get location
  userLocation: geoCoderUrl,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
