import { db } from "../models/db.js";

export const cityController = {
  index: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);

      


      const viewData = {
        title: "City",
        city: city,
      };
      return h.view("city-view", viewData);
    },
  },

  addPoe: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);

      console.log("Fetching city with ID:", request.params.id); // ✅ Debug: Check if ID is correct
      console.log("City found:", city);  // ✅ Debug: Check if the city exists

      const newPoe = {
        name: request.payload.name,
        address: request.payload.address,
        Vduration: Number(request.payload.Vduration),
      };
      console.log("New POE being added:", newPoe);
      
      
      await db.poeStore.addPoe(city._id, newPoe);
      return h.redirect(`/city/${city._id}`);
    },
  },

  deletePoe: {
    handler: async function(request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      await db.poeStore.deletePoe(request.params.poeid);
      return h.redirect(`/city/${city._id}`);
    },
  },

};
