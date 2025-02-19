import { userMemStore } from "./mem/user-mem-store.js";
import { cityMemStore } from "./mem/city-mem-store.js";  // Make sure this matches your actual file
import { poeMemStore } from "./mem/poe-mem-store.js";

export const db = {
  userStore: null,
  cityStore: null,
  poeStore: null,

  init() {
    this.userStore = userMemStore;
    this.cityStore = cityMemStore;
    this.poeStore =  poeMemStore;
  },
};
