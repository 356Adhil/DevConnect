import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.devconnect.cloud",
});

export default instance;
