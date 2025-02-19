import { v4 } from "uuid";
import { poeMemStore } from "./poe-mem-store.js";

let cities = []; 

export const cityMemStore = {
  async getAllCities() {
    return cities;  
  },

  async addCity(city) {  
    city._id = v4();  
    cities.push(city); 
    return city;   
  },

  async getUserCities(userid) {
    return cities.filter((city) => city.userid === userid);
  },


  async getCityById(id) {  
    const list = cities.find((city) => city._id === id);
    list.poes = await poeMemStore.getPoesByCityId(list._id);
    return list; 
  },

  async deleteCityById(id) { 
    const index = cities.findIndex((city) => city._id === id); 
    if (index !== -1) {
      cities.splice(index, 1); 
    }
  },

  async deleteAllCities() { 
    cities = []; 
  },
};
