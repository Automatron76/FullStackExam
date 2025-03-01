import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
};
