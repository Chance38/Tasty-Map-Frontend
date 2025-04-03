import apiClient from './apiClient';

const listTypes = () => {
  return apiClient.get("/types");
};

export { listTypes };
