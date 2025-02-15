import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const playlists = await db.pointsOfViewMemStore.getAllPointsOfView();
      const viewData = {
        title: "City Dashboard",
        cities: citiess,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCity: {
    handler: async function (request, h) {
      const newCity = {
        title: request.payload.title,
      };
      await db.pointsOfViewMemStore.addPointOfView(newCity);
      return h.redirect("/dashboard");
    },
  },
};
