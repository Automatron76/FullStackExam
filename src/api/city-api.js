import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const cityApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const cities = await db.cityStore.getAllCities();
        return cities;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const city = await db.cityStore.getCityById(request.params.id);
        if (!city) {
          return Boom.notFound("No City with this id");
        }
        return city;
      } catch (err) {
        return Boom.serverUnavailable("No City with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const city = request.payload;
        const newCity = await db.cityStore.addCity(city);
        if (newCity) {
          return h.response(newCity).code(201);
        }
        return Boom.badImplementation("error creating city");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const city = await db.cityStore.getCityById(request.params.id);
        if (!city) {
          return Boom.notFound("No City with this id");
        }
        await db.cityStore.deleteCityById(city._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No City with this id");
      }
    },
  },


  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.cityStore.deleteAllCities();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

};
