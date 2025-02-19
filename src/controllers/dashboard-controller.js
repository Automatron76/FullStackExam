import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const cities = await db.cityStore.getUserCities(loggedInUser._id);
      const viewData = {
        title: "City Dashboard",
        cities: cities,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCity: {

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const newCity = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.cityStore.addCity(newCity);
      return h.redirect("/dashboard");
    },
  },
};
