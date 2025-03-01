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



  async createCity(city) {
    const res = await axios.post(`${this.city2Url}/api/cities`, city);
    return res.data;
  },

  async deleteAllCities() {
    const response = await axios.delete(`${this.city2Url}/api/cities`);
    return response.data;
  },

  async deleteCity(id) {
    const response = await axios.delete(`${this.city2Url}/api/cities/${id}`);
    return response;
  },

  async getAllCities() {
    const res = await axios.get(`${this.city2Url}/api/cities`);
    return res.data;
  },

  async getCity(id) {
    const res = await axios.get(`${this.city2Url}/api/cities/${id}`);
    return res.data;
  },




  async getAllPoes() {
    const res = await axios.get(`${this.city2Url}/api/poes`);
    return res.data;
  },

  async createPoe(id, poe) {
    const res = await axios.post(`${this.city2Url}/api/cites/${id}/poes`, poe);
    return res.data;
  },

  async deleteAllPoes() {
    const res = await axios.delete(`${this.city2Url}/api/poes`);
    return res.data;
  },

  async getPoe(id) {
    const res = await axios.get(`${this.city2Url}/api/poes/${id}`);
    return res.data;
  },

  async deletePoe(id) {
    const res = await axios.delete(`${this.city2Url}/api/poes/${id}`);
    return res.data;
  },
}
