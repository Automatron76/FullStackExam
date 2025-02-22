import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poeSchema = new Schema({
  name: String,
  address: String,
  Vduration: Number,
  cityid: {
    type: Schema.Types.ObjectId,
    ref: "City",
  },
});

export const Poe = Mongoose.model("Poe", poeSchema);
