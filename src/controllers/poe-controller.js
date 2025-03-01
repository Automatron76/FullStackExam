import { PoeSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const poeController = {
  index: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      const poe = await db.poeStore.getPoeById(request.params.poeid);
      const viewData = {
        name: "Edit Poe",
        city: city,
        poe: poe,
      };
      return h.view("poe-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PoeSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poe-view", { title: "Edit poe error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const poe = await db.poeStore.getPoeById(request.params.poeid);
      const newPoe = {
        name: request.payload.name,
        address: request.payload.address,
        Vduration: Number(request.payload.Vduration),
      };
      await db.poeStore.updatePoe(poe, newPoe);
      return h.redirect(`/city/${request.params.id}`);
    },
  },
};