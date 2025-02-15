import { userMemStore } from "./mem/user-mem-store.js";
import { pointsOfViewMemStore } from "./mem/poe-mem-store.js";

export const db = {
  userStore: null,
  pointsOfView: null,

  init() {
    this.userStore = userMemStore;
    this.pointsOfView = pointsOfViewMemStore;
  },
};
