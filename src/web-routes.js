import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { cityController } from "./controllers/city-controller.js";
import { poeController } from "./controllers/poe-controller.js"

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/city/{id}", config: cityController.index },
  { method: "POST", path: "/city/{id}/addpoe", config: cityController.addPoe },

  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcity", config: dashboardController.addCity },
  { method: "GET", path: "/dashboard/deletecity/{id}", config: dashboardController.deleteCity },
  { method: "GET", path: "/city/{id}/deletepoe/{poeid}", config: cityController.deletePoe },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  { method: "GET", path: "/poe/{id}/editpoe/{poeid}", config: poeController.index },
  { method: "POST", path: "/poe/{id}/updatepoe/{poeid}", config: poeController.update },
];
