import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000,
  header: {
    "Content-Type": "application/json"
  }
});

export default api;
