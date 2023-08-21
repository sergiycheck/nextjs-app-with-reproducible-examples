import axios from "axios";

const baseURL = "https://deep-index.moralis.io/";

export const axiosInstance = axios.create({
  baseURL,
  headers: { "X-API-Key": "SaiwLdFTq9jY10ebaOvfxhxKBoAhBPbGEdSX4kTonHqYHiYGQkngsvdXK8hx20Sf" },
});
