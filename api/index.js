import axios from "axios";

const env = process.env.NODE_ENV;
var url = "";

if (env == "development") {
  url = "http://localhost:3000/api/";
} else if (env == "production") {
  url = "https://sonic-delivery.vercel.app/api/";
}

const api = axios.create({
  baseURL: url,
  timeout: 10000,
  header: {
    "Content-Type": "application/json"
  }
});

export default api;
