// TODO: Implement the api client

import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:3000",
});

export default apiClient;
