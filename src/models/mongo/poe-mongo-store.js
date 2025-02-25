import { Poe } from "./poe.js";
import Mongoose from "mongoose";

export const poeMongoStore = {
  async getAllPoes() {
    const poes = await Poe.find().lean();
    return poes;
  },

  async addPoe(cityId, poe) {
    poe.cityd = cityId;
    const newPoe = new Poe(poe);
    const poeObj = await newPoe.save();
    return this.getPoeById(poeObj._id);
  },

  async getPoesByCityId(id) {
    const poes = await Poe.find({ cityid: id }).lean();
    return poes;
  },

  async getPoeById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const poe = await Poe.findOne({ _id: id }).lean();
      return poe;
    }
    return null;
  },

  async deletePoe(id) {
    try {
      await Poe.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPoes() {
    await Poe.deleteMany({});
  },

  async updatePoe(poe, updatedPoe) {
    const poeDoc = await Poe.findOne({ _id: poe._id });
    poeDoc.name = updatedPoe.name;
    poeDoc.address = updatedPoe.address;
    poeDoc.Vduration = updatedPoe.Vduration;
    await poeDoc.save();
  },
};