import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const cities = await db.pointsOfView.getAllPointsOfView();
      const viewData = {
        title: "City Dashboard",
        cities: cities,
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
