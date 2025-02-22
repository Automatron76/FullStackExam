import { Poe } from "./poe.js";

export const poeMongoStore = {
  async getPoesByCityId(id) {
    const poes = await Poe.find({ cityid: id }).lean();
    return poes;
  },
};
