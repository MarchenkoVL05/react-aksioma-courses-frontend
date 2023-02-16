import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444/api/",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// axios.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

export default instance;
