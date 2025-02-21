//import { userMemStore } from "./mem/user-mem-store.js";
//import { cityMemStore } from "./mem/city-mem-store.js";  
//import { poeMemStore } from "./mem/poe-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { cityJsonStore } from "./json/city-json-store.js";
import { poeJsonStore } from "./json/poe-json-store.js";


export const db = {
  userStore: null,
  cityStore: null,
  poeStore: null,

  init() {
    this.userStore =  userJsonStore;
    this.cityStore =  cityJsonStore;
    this.poeStore =   poeJsonStore;
  },
};
