import apiClient from './apiClient';

export const createRestaurant = (restaurant) => {
  return apiClient.post("/restaurants", restaurant);
};

export const listRestaurant = () => {
  return apiClient.get("/restaurants");
};

export const updateRestaurant = (id, restaurant) => {
  return apiClient.put(`/restaurants/${id}`, restaurant);
};

export const deleteRestaurant = (id) => {
  return apiClient.delete(`/restaurants/${id}`);
};

export default listRestaurant;
