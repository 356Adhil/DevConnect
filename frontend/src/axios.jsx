import axios from "axios";

const instance = axios.create({
  baseURL: "https://devconnect.cloud/backend",
});

export default instance;
