import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const city2Service = {
  city2Url: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.city2Url}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.city2Url}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.city2Url}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.city2Url}/api/users`);
    return res.data;
  },
}
