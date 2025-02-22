import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const poeJsonStore = {
  async getAllPoes() {
    await db.read();
    return db.data.poes;
  },

  async addPoe(cityId, poe) {
    await db.read();
    poe._id = v4();
    poe.cityid = cityId;
    db.data.poes.push(poe);
    await db.write();
    return poe;
  },

  async getPoesByCityId(id) {
    await db.read();
    let foundPoes = db.data.poes.filter((poe) => poe.cityid === id);
    if (!foundPoes) {
      foundPoes = null;
    }
    return foundPoes;
  },

  async getPoeById(id) {
    await db.read();
    let foundPoe = db.data.poes.find((poe) => poe._id === id);
    if (!foundPoe) {
      foundPoe = null;
    }
    return foundPoe;
  },

  async deletePoe(id) {
    await db.read();
    const index = db.data.poes.findIndex((poe) => poe._id === id);
    if (index !== -1) db.data.poes.splice(index, 1);
    await db.write();
  },

  async deleteAllPoes() {
    db.data.poes = [];
    await db.write();
  },

  async updatePoe(poe, updatedPoe) {
    poe.title = updatedPoe.name;
    poe.artist = updatedPoe.artist;
    poe.Vduration = updatedPoe.Vduration;
    await db.write();
  },
};
