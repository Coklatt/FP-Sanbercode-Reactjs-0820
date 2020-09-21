import axios from "axios";

const api = axios.create({
  baseURL: `https://backendexample.sanbersy.com/api/`,
});

export default api;
