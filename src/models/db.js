import { userMemStore } from "./mem/user-mem-store.js";
import { cityMemStore } from "./mem/city-mem-store.js";  
import { poeMemStore } from "./mem/poe-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { cityJsonStore } from "./json/city-json-store.js";
import { poeJsonStore } from "./json/poe-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

import { cityMongoStore } from "./mongo/city-mongo-store.js";

import { poeMongoStore } from "./mongo/poe-mongo-store.js";

export const db = {
  userStore: null,
  cityStore: null,
  poeStore: null,

  init(storeType) {
    switch(storeType) {
     case "json":
      this.userStore =  userJsonStore;
      this.cityStore =  cityJsonStore;
      this.poeStore =   poeJsonStore;
      break;

     case "mongo":
      this.userStore = userMongoStore;
      this.cityStore = cityMongoStore;
      this.poeStore = poeMongoStore;

      connectMongo();
      break;

     default:

     this.userStore = userMemStore;
     this.cityStore = cityMemStore;
     this.poeStore = poeMemStore;
  }
},
};
