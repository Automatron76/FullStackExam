import { v4 } from "uuid";

let pointsOfView = []; 

export const pointsOfViewMemStore = {
  async getAllPointsOfView() {
    return pointsOfView;  
  },

  async addPointOfView(pointOfView) {  
    pointOfView._id = v4();  
    pointsOfView.push(pointOfView); 
    return pointOfView;   
},

  async getPointOfViewById(id) {  
    return pointsOfView.find((point) => point._id === id); 
  },

  async deletePointOfViewById(id) { 
    const index = pointsOfView.findIndex((point) => point._id === id); 
    if (index !== -1) {
      pointsOfView.splice(index, 1); 
    }
  },

  async deleteAllPointsOfView() { 
    pointsOfView = []; 
  },
};
