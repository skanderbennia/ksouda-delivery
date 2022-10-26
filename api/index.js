import axios from 'axios';

const api = axios.create({
  baseURL: "https://sonic-delivery.vercel.app/api/",
  timeout: 5000,
  header: {
    "Content-Type": "application/json",
  },
});

export default api;
