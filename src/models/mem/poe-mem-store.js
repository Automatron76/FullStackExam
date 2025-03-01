import { v4 } from "uuid";

let poes = [];

export const poeMemStore = {
  async getAllPoes() {
    return poes;
  },

  async addPoe(cityid, poe) {
    poe._id = v4();
    poe.cityid = cityid;
    console.log("Adding POE:", poe); // Debugging
    poes.push(poe);
    return poe;
  },

  async getPoesByCityId(id) {
    return poes.filter((poe) => poe.cityid === id);
  },

  async getPoeById(id) {
    let foundPoe = poes.find((poe) => poe._id === id);
    if (!foundPoe) {
      foundPoe = null;
    }
    return foundPoe;
  },

  async getCityPoes(cityid) {
    let foundPoes = poes.filter((poe) => poe.cityid === cityId);
    if (!foundPoes) {
      foundPoes = null;
    }
    return foundPoes;
  },

  async deletePoe(id) {
    const index = poes.findIndex((poe) => poe._id === id);
    if (index !== -1) poes.splice(index, 1);
  },

  async deleteAllPoes() {
    poes = [];
  },

  async updatePoe(poe, updatedPoe) {
    poe.name = updatedPoe.name;
    poe.address = updatedPoe.address;
    poe.Vduration = updatedPoe.Vduration;
  },
};
