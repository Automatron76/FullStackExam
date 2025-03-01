import { userApi } from "./api/user-api.js";
import { cityApi } from "./api/city-api.js";
import { poeApi } from "./api/poe-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/cities", config: cityApi.create },
  { method: "DELETE", path: "/api/cities", config: cityApi.deleteAll },
  { method: "GET", path: "/api/cities", config: cityApi.find },
  { method: "GET", path: "/api/cities/{id}", config: cityApi.findOne },
  { method: "DELETE", path: "/api/cities/{id}", config: cityApi.deleteOne },

  { method: "GET", path: "/api/poes", config: poeApi.find },
  { method: "GET", path: "/api/poes/{id}", config: poeApi.findOne },
  { method: "POST", path: "/api/cities/{id}/poes", config: poeApi.create },
  { method: "DELETE", path: "/api/poes", config: poeApi.deleteAll },
  { method: "DELETE", path: "/api/poes/{id}", config: poeApi.deleteOne },
];
