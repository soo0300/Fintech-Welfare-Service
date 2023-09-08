import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "http://localhost:8083/",
  //   baseURL: "https://i9c110.p.ssafy.io/api/",
});
