import axios from "axios";

export const mojangApi = axios.create({
  baseURL: "https://corsproxy.io/?https://api.mojang.com",
});
