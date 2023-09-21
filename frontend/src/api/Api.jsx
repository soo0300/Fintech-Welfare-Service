import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "http://j9c209.p.ssafy.io:8090",
  //   baseURL: "https://i9c110.p.ssafy.io/api/",
});
