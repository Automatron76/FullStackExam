import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PoeSpec, PoeSpecPlus, PoeArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poeApi = {

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poes = await db.poeStore.getAllPoes();
        return poes;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    response: { schema: PoeArraySpec, failAction: validationError },
    description: "Get all poeApi",
    notes: "Returns all poeApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const poe = await db.poeStore.getPoeById(request.params.id);
        if (!poe) {
          return Boom.notFound("No poe with this id");
        }
        return poe;
      } catch (err) {
        return Boom.serverUnavailable("No poe with this id");
      }
    },

    tags: ["api"],
    description: "Find a Poe",
    notes: "Returns a poe",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PoeSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poe = await db.poeStore.addPoe(request.params.id, request.payload);
        if (poe) {
          return h.response(poe).code(201);
        }
        return Boom.badImplementation("error creating poe");
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },

    tags: ["api"],
    description: "Create a poe",
    notes: "Returns the newly created poe",
    validate: { payload: PoeSpec },
    response: { schema: PoeSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.poeStore.deleteAllPoes();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },

    tags: ["api"],
    description: "Delete all poeApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poe = await db.poeStore.getPoeById(request.params.id);
        if (!poe) {
          return Boom.notFound("No Poe with this id");
        }
        await db.poeStore.deletePoe(poe._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poe with this id");
      }
    }
  },
  tags: ["api"],
  description: "Delete all trackApi",
};
