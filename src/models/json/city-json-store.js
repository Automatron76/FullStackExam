import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { poeJsonStore } from "./poe-json-store.js";

export const cityJsonStore = {
  async getAllCities() {
    await db.read();
    return db.data.cities;
  },

  async addCity(city) {
    await db.read();
    city._id = v4();
    db.data.cities.push(city);
    await db.write();
    return city;
  },

  async getCityById(id) {
    await db.read();
    let list = db.data.cities.find((city) => city._id === id);
    if (list) {
      list.poes = await poeJsonStore.getPoesByCityId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCities(userid) {
    await db.read();
    return db.data.cities.filter((city) => city.userid === userid);
  },

  async deleteCityById(id) {
    await db.read();
    const index = db.data.cities.findIndex((city) => city._id === id);
    if (index !== -1) db.data.cities.splice(index, 1);
    await db.write();
  },

  async deleteAllCities() {
    db.data.cities = [];
    await db.write();
  },
};
