import Boom from "@hapi/boom";
import { IdSpec, CityArraySpec, CitySpec, CitySpecPlus } from "../models/joi-schemas.js"
import { db } from "../models/db.js";
import { validationError } from "./logger.js";


export const cityApi = {
  find: {
     auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const cities = await db.cityStore.getAllCities();
        return cities;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    response: { schema: CityArraySpec, failAction: validationError },
    description: "Get all cities",
    notes: "Returns all citiess",
  },

  findOne: {
     auth: {
      strategy: "jwt",
    },
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

    tags: ["api"],
    description: "Find a City",
    notes: "Returns a city",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CitySpecPlus, failAction: validationError },
  },

  create: {
     auth: {
      strategy: "jwt",
    },
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

    tags: ["api"],
    description: "Create a City",
    notes: "Returns the newly created city",
    validate: { payload: CitySpec, failAction: validationError },
    response: { schema: CitySpecPlus, failAction: validationError },
  },

  deleteOne: {
     auth: {
      strategy: "jwt",
    },
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

    tags: ["api"],
    description: "Delete a city",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },


  deleteAll: {
     auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.cityStore.deleteAllCities();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Delete all CityApi",
  },

};
